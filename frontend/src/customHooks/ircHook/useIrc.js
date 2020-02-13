import { useReducer, useEffect } from "react";

import {
	IrcReducer,
	CONNECTION_LOST,
	MAKING_CONNECTION,
	LEAVE_CHANNEL,
	CHANNEL_PRV_MSG
} from "./IrcReducer.js";
import { IrcEventListeners } from "../../irc/IrcEventListeners.js";

export const useIrc = () => {
	const [state, dispatch] = useReducer(IrcReducer, {
		nick: "",
		serverName: "",
		serverMsgs: [],
		userChannels: [],
		joinableChannels: {
			pages: 0,
			channelCount: 0,
			channels: []
		},
		isConnected: false,
		isGrabbingChannels: false,
		ircSocket: null
	});

	useEffect(() => {
		if (state.ircSocket) {
			IrcEventListeners(state.ircSocket, dispatch);
		}
	}, [state.ircSocket]);

	const connectToIrc = (ircOptions, e) => {
		e.preventDefault();

		dispatch({ type: MAKING_CONNECTION, payload: ircOptions });
	};

	const disconnectFromIrc = () => {
		state.ircSocket.close();
		dispatch({ type: CONNECTION_LOST });
	};

	const joinIrcChannel = channelName => {
		state.ircSocket.emit("join channel", channelName);
	};

	const grabAvailableChannels = () => {
		state.ircSocket.emit("grab channel list");
	};

	const leaveIrcChannel = channelName => {
		state.ircSocket.emit("leave channel", channelName);
		dispatch({ type: LEAVE_CHANNEL, payload: channelName });
	};

	const sendMessageToChannel = (target, message, nick) => {
		state.ircSocket.emit("msgChannel", { target, message });
		dispatch({ type: CHANNEL_PRV_MSG, payload: { target, nick, message } });
	};

	const setUserAsAway = () => {
		state.ircSocket.emit("set away");
	};

	const setUserAsBack = () => {
		state.ircSocket.emit("set back");
	};

	return {
		state,
		connectToIrc,
		joinIrcChannel,
		disconnectFromIrc,
		grabAvailableChannels,
		leaveIrcChannel,
		sendMessageToChannel,
		setUserAsAway,
		setUserAsBack
	};
};

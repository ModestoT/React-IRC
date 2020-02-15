import { useReducer, useEffect } from "react";

import {
	IrcReducer,
	CONNECTION_LOST,
	MAKING_CONNECTION,
	LEAVE_CHANNEL,
	CHANNEL_PRV_MSG,
	CREATE_PRV_MSG_TAB,
	JOIN_CHANNELS,
	DELETE_CONFIG
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
		channelsToJoin: [],
		pastConfigs: JSON.parse(localStorage.getItem("past_configs")) || [],
		isConnected: false,
		isConnectedToServer: false,
		isSaveConfig: false,
		isGrabbingChannels: false,
		ircSocket: null
	});

	useEffect(() => {
		if (state.ircSocket) {
			IrcEventListeners(state.ircSocket, dispatch);
		}
	}, [state.ircSocket]);

	useEffect(() => {
		if (state.isConnectedToServer && state.channelsToJoin.length > 0) {
			dispatch({ type: JOIN_CHANNELS, payload: state.channelsToJoin });
		}
	}, [state.isConnectedToServer, state.channelsToJoin]);

	const connectToIrc = (e, ircOptions, saveConfig) => {
		e.preventDefault();

		if (state.isConnected) {
			dispatch({ type: CONNECTION_LOST });
			state.ircSocket.close();
		}
		dispatch({ type: MAKING_CONNECTION, payload: { saveConfig, ircOptions } });
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

	const createPrvMsgTab = target => {
		dispatch({ type: CREATE_PRV_MSG_TAB, payload: target });
	};

	const deleteConfig = id => {
		dispatch({ type: DELETE_CONFIG, payload: id });
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
		setUserAsBack,
		createPrvMsgTab,
		deleteConfig
	};
};

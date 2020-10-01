import { useReducer, useEffect } from "react";

import {
	IrcReducer,
	CONNECTION_LOST,
	MAKING_CONNECTION,
	LEAVE_CHANNEL,
	CHANNEL_PRV_MSG,
	JOIN_CHANNELS,
	DELETE_SERVER_FROM_STORAGE,
	DELETE_CHANNEL_FROM_STORAGE,
	UPDATE_READ_MESSAGES,
	SEND_PERSONAL_MESSAGE,
	UPDATE_USER_STATUS,
	RESET_ERROR,
} from "./IrcReducer.js";

import { IrcEventListeners } from "../../irc/IrcEventListeners.js";

export const useIrc = () => {
	const [state, dispatch] = useReducer(IrcReducer, {
		nick: "",
		serverName: "",
		away: false,
		serverMsgs: [],
		userChannels: [],
		joinableChannels: {
			pages: 0,
			channelCount: 0,
			channels: [],
		},
		channelsToJoin: [],
		privateMsgs: [],
		totalUnreadMessages: 0,
		pastServers: JSON.parse(localStorage.getItem("past_servers")) || [],
		isConnected: false,
		isConnectedToServer: false,
		isGrabbingChannels: false,
		ircSocket: null,
		error: "",
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

	const connectToIrc = (e, ircOptions, savedServer) => {
		e.preventDefault();

		if (state.isConnected) {
			dispatch({ type: CONNECTION_LOST });
			state.ircSocket.close();
		}
		dispatch({ type: MAKING_CONNECTION, payload: { ...ircOptions, savedServer } });
	};

	const disconnectFromIrc = () => {
		console.log("disconneting from irc server");
		state.ircSocket.close();
		dispatch({ type: CONNECTION_LOST });
	};

	const joinIrcChannel = (channelName) => {
		state.ircSocket.emit("join channel", channelName);
	};

	const grabAvailableChannels = () => {
		state.ircSocket.emit("grab channel list");
	};

	const leaveIrcChannel = (channelName) => {
		console.log("Leaving channel");
		state.ircSocket.emit("leave channel", channelName);
		dispatch({ type: LEAVE_CHANNEL, payload: channelName });
	};

	const sendMessageToChannel = (target, message, nick) => {
		state.ircSocket.emit("msgChannel", { target, message });
		dispatch({ type: CHANNEL_PRV_MSG, payload: { target, nick, message } });
	};

	const setUserAsAway = () => {
		state.ircSocket.emit("set away");
		dispatch({ type: UPDATE_USER_STATUS, payload: true });
	};

	const setUserAsBack = () => {
		state.ircSocket.emit("set back");
		dispatch({ type: UPDATE_USER_STATUS, payload: false });
	};

	const sendPrivMsg = (data) => {
		state.ircSocket.emit("msgChannel", data);
		dispatch({
			type: SEND_PERSONAL_MESSAGE,
			payload: { user: data.target, message: data.message },
		});
	};

	const deleteServer = (id) => {
		dispatch({ type: DELETE_SERVER_FROM_STORAGE, payload: id });
		if (state.isConnected) {
			disconnectFromIrc();
		}
	};

	const deleteChannelFromPastServers = (channel, serverId) => {
		dispatch({ type: DELETE_CHANNEL_FROM_STORAGE, payload: { channel, serverId } });
		leaveIrcChannel(channel);
	};

	const updateReadMessages = (user, unReadMessageCount) => {
		dispatch({ type: UPDATE_READ_MESSAGES, payload: { user, unReadMessageCount } });
	};

	const ResetErr = () => {
		dispatch({ type: RESET_ERROR });
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
		sendPrivMsg,
		deleteServer,
		deleteChannelFromPastServers,
		updateReadMessages,
		ResetErr,
	};
};

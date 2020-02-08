import { useReducer, useEffect } from "react";

import { ParseForChannelName } from "../../helpers/IrcHelpers.js";
import {
	IrcReducer,
	NOTICE_MESSAGE,
	CHANNEL_NOTICE,
	CHANNEL_MESSAGE,
	MOTD_MESSAGE,
	CONNECTION_ESTABLISHED,
	CONNECTION_LOST,
	MAKING_CONNECTION,
	GRABBING_CHANNEL_LIST,
	UPDATE_CHANNELS_COUNT,
	GRABBING_CHANNEL_LIST_END,
	CHANNEL_PRV_MSG,
	UPDATE_USERS_LIST,
	LEAVE_CHANNEL
} from "./IrcReducer.js";

export const useIrc = () => {
	const [state, dispatch] = useReducer(IrcReducer, {
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
			state.ircSocket
				.on("connected", () => {
					dispatch({ type: CONNECTION_ESTABLISHED });
				})
				.on("disconnect", reason => {
					dispatch({ type: CONNECTION_LOST });
					console.log("Diconnected from irc: ", reason);
					state.ircSocket.close();
				})
				.on("irc notice", notice => {
					const channelName = ParseForChannelName(notice.message);

					if (!channelName || channelName[0] !== "#") {
						dispatch({ type: NOTICE_MESSAGE, payload: notice });
					} else {
						dispatch({
							type: CHANNEL_NOTICE,
							payload: { ...notice, channelName }
						});
					}
				})
				.on("joined channel", e => {
					dispatch({
						type: CHANNEL_MESSAGE,
						payload: { ...e, status: "joined" }
					});
				})
				.on("left channel", e => {
					dispatch({
						type: CHANNEL_MESSAGE,
						payload: { ...e, status: "left" }
					});
				})
				.on("users list", data => {
					dispatch({ type: UPDATE_USERS_LIST, payload: data });
				})
				.on("server motd", motd => {
					dispatch({ type: MOTD_MESSAGE, payload: motd });
				})
				.on("grabbing channel list", () => {
					dispatch({ type: GRABBING_CHANNEL_LIST });
				})
				.on("available channels", count => {
					dispatch({ type: UPDATE_CHANNELS_COUNT, payload: count });
				})
				.on("grabbing channel list end", channels => {
					dispatch({ type: GRABBING_CHANNEL_LIST_END, payload: channels });
				})
				.on("channel prv msg", msg => {
					dispatch({ type: CHANNEL_PRV_MSG, payload: msg });
				});
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

	return {
		state,
		connectToIrc,
		joinIrcChannel,
		disconnectFromIrc,
		grabAvailableChannels,
		leaveIrcChannel
	};
};

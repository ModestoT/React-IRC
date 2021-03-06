import {
	NOTICE_MESSAGE,
	CHANNEL_NOTICE,
	CHANNEL_MESSAGE,
	MOTD_MESSAGE,
	CONNECTION_ESTABLISHED,
	CONNECTION_LOST,
	GRABBING_CHANNEL_LIST,
	UPDATE_CHANNELS_COUNT,
	GRABBING_CHANNEL_LIST_END,
	CHANNEL_PRV_MSG,
	UPDATE_USERS_LIST,
	PERSONAL_MSG,
	CONNECTION_TO_SERVER_MADE,
	UPDATE_USER_STATUS,
	DISPLAY_ERROR,
} from "../customHooks/ircHook/IrcReducer.js";
import { ParseForChannelName } from "../helpers/IrcHelpers.js";

export const IrcEventListeners = (socket, dispatch) => {
	socket
		.on("connected", () => {
			dispatch({ type: CONNECTION_ESTABLISHED });
		})
		.on("connected to server", () => {
			dispatch({ type: CONNECTION_TO_SERVER_MADE });
			socket.emit("get status");
		})
		.on("disconnect", (reason) => {
			dispatch({ type: CONNECTION_LOST });
			console.log("Diconnected from irc: ", reason);
			socket.close();
		})
		.on("irc notice", (notice) => {
			const channelName = ParseForChannelName(notice.message);

			if (!channelName || channelName[0] !== "#") {
				dispatch({ type: NOTICE_MESSAGE, payload: notice });
			} else {
				dispatch({
					type: CHANNEL_NOTICE,
					payload: { ...notice, channelName },
				});
			}
		})
		.on("joined channel", (e) => {
			dispatch({
				type: CHANNEL_MESSAGE,
				payload: { ...e, status: "joined" },
			});
		})
		.on("left channel", (e) => {
			dispatch({
				type: CHANNEL_MESSAGE,
				payload: { ...e, status: "left" },
			});
		})
		.on("users list", (data) => {
			dispatch({ type: UPDATE_USERS_LIST, payload: data });
		})
		.on("server motd", (motd) => {
			dispatch({ type: MOTD_MESSAGE, payload: motd });
		})
		.on("grabbing channel list", () => {
			dispatch({ type: GRABBING_CHANNEL_LIST });
		})
		.on("available channels", (count) => {
			dispatch({ type: UPDATE_CHANNELS_COUNT, payload: count });
		})
		.on("grabbing channel list end", (channels) => {
			dispatch({ type: GRABBING_CHANNEL_LIST_END, payload: channels });
		})
		.on("channel prv msg", (msg) => {
			//timeout used to add slight delay before dispatching a render for the message. Aim is to improve preformance.
			setTimeout(() => {
				dispatch({ type: CHANNEL_PRV_MSG, payload: msg });
			}, 200);
		})
		.on("personal msg", (data) => {
			dispatch({ type: PERSONAL_MSG, payload: data });
		})
		.on("status", (status) => {
			dispatch({ type: UPDATE_USER_STATUS, payload: status });
		})
		.on("errMsg", (err) => {
			socket.close();
			dispatch({ type: DISPLAY_ERROR, payload: err });
		});
};

import { GrabServerName, CheckIfOverMessageLimit } from "../../helpers/IrcHelpers.js";
import {
	AddChannelToPastServers,
	DeleteServer,
	DeleteChannelFromServer,
} from "../../helpers/GeneralHelpers.js";
import CreateIrcConnection from "../../irc/CreateIrcConnection.js";

export const CONNECTION_ESTABLISHED = "CONNECTION_ESTABLISHED";
export const CONNECTION_LOST = "CONNECTION_LOST";
export const NOTICE_MESSAGE = "NOTICE_MESSAGE";
export const MOTD_MESSAGE = "MOTD_MESSAGE";
export const CHANNEL_NOTICE = "CHANNEL_NOTICE";
export const CHANNEL_MESSAGE = "CHANNEL_MESSAGE";
export const MAKING_CONNECTION = "MAKING_CONNECTION";
export const GRABBING_CHANNEL_LIST = "GRABBING_CHANNEL_LIST";
export const UPDATE_CHANNELS_COUNT = "UPDATE_CHANNELS_COUNT";
export const GRABBING_CHANNEL_LIST_END = "GRABBING_CHANNEL_LIST_END";
export const CHANNEL_PRV_MSG = "CHANNEL_PRV_MSG";
export const UPDATE_USERS_LIST = "UPDATE_USERS_LIST";
export const LEAVE_CHANNEL = "LEAVE_CHANNEL";
export const PERSONAL_MSG = "PERSONAL_MSG";
export const UPDATE_READ_MESSAGES = "UPDATE_READ_MESSAGES";
export const CONNECTION_TO_SERVER_MADE = "CONNECTION_TO_SERVER_MADE";
export const JOIN_CHANNELS = "JOIN_CHANNELS";
export const DELETE_SERVER_FROM_STORAGE = "DELETE_SERVER_FROM_STORAGE";
export const DELETE_CHANNEL_FROM_STORAGE = "DELETE_CHANNEL_FROM_STORAGE";

export const IrcReducer = (state, action) => {
	let channel;
	switch (action.type) {
		case MAKING_CONNECTION:
			let { host, nick, port, ssl } = action.payload.ircOptions;
			let channelsToJoin = action.payload.ircOptions.channels || [];
			const ircSocket = CreateIrcConnection({ host, nick, port, ssl }, action.payload.saveServer);

			return {
				...state,
				nick: nick,
				serverName: GrabServerName(host),
				pastServers: action.payload.saveServer
					? JSON.parse(localStorage.getItem("past_servers"))
					: state.pastServers,
				channelsToJoin,
				ircSocket,
			};
		case CONNECTION_ESTABLISHED:
			console.log("connected to irc");
			return {
				...state,
				isConnected: true,
			};
		case CONNECTION_LOST:
			return {
				...state,
				serverName: "",
				serverMsgs: [],
				userChannels: [],
				joinableChannels: {
					pages: 0,
					channels: [],
					channelCount: 0,
				},
				isConnected: false,
				isConnectedToServer: false,
				ircSocket: null,
			};
		case CONNECTION_TO_SERVER_MADE:
			return {
				...state,
				isConnectedToServer: true,
			};
		case DELETE_SERVER_FROM_STORAGE:
			return {
				...state,
				pastServers: DeleteServer(action.payload),
			};
		case DELETE_CHANNEL_FROM_STORAGE:
			return {
				...state,
				pastServers: DeleteChannelFromServer(action.payload.channel, action.payload.serverId),
			};
		case JOIN_CHANNELS:
			action.payload.forEach((channel) => state.ircSocket.emit("join channel", channel));
			return {
				...state,
				channelsToJoin: [],
			};
		case GRABBING_CHANNEL_LIST:
			return {
				...state,
				isGrabbingChannels: true,
			};
		case UPDATE_CHANNELS_COUNT:
			return {
				...state,
				joinableChannels: {
					pages: state.joinableChannels.pages + 1,
					channelCount: state.joinableChannels.channelCount + action.payload,
				},
			};
		case GRABBING_CHANNEL_LIST_END:
			return {
				...state,
				isGrabbingChannels: false,
				joinableChannels: {
					...state.joinableChannels,
					channels: action.payload,
				},
			};
		case NOTICE_MESSAGE:
			return {
				...state,
				serverMsgs: [...state.serverMsgs, `-${action.payload.nick}- ${action.payload.message}`],
			};
		case MOTD_MESSAGE:
			return {
				...state,
				serverMsgs: [...state.serverMsgs, action.payload],
			};
		case CHANNEL_NOTICE:
			return {
				...state,
				userChannels: state.userChannels.map((c) => {
					let { messages, messagesCount } = CheckIfOverMessageLimit(c, 500);
					return c.channelName.toLowerCase() === action.payload.channelName.toLowerCase()
						? {
								...c,
								messages: [...messages, `-${action.payload.nick}- ${action.payload.message}`],
								messagesCount: messagesCount + 1,
						  }
						: c;
				}),
			};
		case CHANNEL_MESSAGE:
			channel = state.userChannels.find(
				({ channelName }) => channelName.toLowerCase() === action.payload.channel.toLowerCase()
			);
			if (channel) {
				const { nick, ident, hostname, status, channel, message, users } = action.payload;
				return {
					...state,
					userChannels: state.userChannels.map((c) => {
						let { messages, messagesCount } = CheckIfOverMessageLimit(c, 500);
						return c.channelName.toLowerCase() === channel.toLowerCase()
							? {
									...c,
									messages: [
										...messages,
										`${nick} [${ident}@${hostname}] has ${status} ${channel} ${
											status === "left" ? `[${message}]` : ""
										}`,
									],
									messagesCount: messagesCount + 1,
									userList: users,
							  }
							: c;
					}),
				};
			} else {
				//channel not in array yet so create a channel object for the new channel
				const updatePastServers = AddChannelToPastServers(action.payload.channel, state.serverName);

				return {
					...state,
					userChannels: [
						...state.userChannels,
						{
							channelName: action.payload.channel,
							messages: [],
							userList: action.payload.users,
							messagesCount: 0,
						},
					],
					pastServers: updatePastServers !== null ? updatePastServers : state.pastServers,
				};
			}
		case CHANNEL_PRV_MSG:
			return {
				...state,
				userChannels: state.userChannels.map((c) => {
					let { messages, messagesCount } = CheckIfOverMessageLimit(c, 500);
					return c.channelName.toLowerCase() === action.payload.target.toLowerCase()
						? {
								...c,
								messages: [...messages, `<${action.payload.nick}> ${action.payload.message}`],
								messagesCount: messagesCount + 1,
						  }
						: c;
				}),
			};
		case UPDATE_USERS_LIST:
			return {
				...state,
				userChannels: state.userChannels.map((c) =>
					c.channelName.toLowerCase() === action.payload.channelName.toLowerCase()
						? { ...c, userList: action.payload.users }
						: c
				),
			};
		case LEAVE_CHANNEL:
			return {
				...state,
				userChannels: state.userChannels.filter(
					(c) => c.channelName.toLowerCase() !== action.payload.toLowerCase()
				),
			};
		case PERSONAL_MSG:
			let findUser = state.privateMsgs.find(
				(msg) => msg.user.toLowerCase() === action.payload.sentFrom.toLowerCase()
			);

			if (findUser) {
				return {
					...state,
					totalUnreadMessages:
						findUser.unReadMessages === 0
							? state.totalUnreadMessages + 1
							: state.privateMsgs.reduce(
									(accumulator, currentValue) => accumulator + currentValue.unReadMessages,
									state.totalUnreadMessages
							  ),
					privateMsgs: state.privateMsgs.map((msg) =>
						msg.user.toLowerCase() === action.payload.sentFrom.toLowerCase()
							? {
									...msg,
									messages: [...msg.messages, action.payload.message],
									unReadMessages: msg.unReadMessages + 1,
							  }
							: msg
					),
				};
			} else {
				return {
					...state,
					totalUnreadMessages: state.totalUnreadMessages + 1,
					privateMsgs: [
						...state.privateMsgs,
						{
							user: action.payload.sentFrom,
							messages: [action.payload.message],
							unReadMessages: 1,
						},
					],
				};
			}

		case UPDATE_READ_MESSAGES:
			return {
				...state,
				totalUnreadMessages: state.totalUnreadMessages - action.payload.unReadMessageCount,
				privateMsgs: state.privateMsgs.map((msg) =>
					msg.user.toLowerCase() === action.payload.user.toLowerCase()
						? { ...msg, unReadMessages: 0 }
						: msg
				),
			};
		default:
			return state;
	}
};

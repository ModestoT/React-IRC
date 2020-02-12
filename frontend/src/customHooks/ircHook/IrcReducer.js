import { GrabServerName, CheckIfOverMessageLimit } from "../../helpers/IrcHelpers.js";
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

export const IrcReducer = (state, action) => {
	switch (action.type) {
		case MAKING_CONNECTION:
			const ircSocket = CreateIrcConnection(action.payload);

			return {
				...state,
				nick: action.payload.nick,
				serverName: GrabServerName(action.payload.host),
				ircSocket
			};
		case CONNECTION_ESTABLISHED:
			console.log("connected to irc");
			return {
				...state,
				isConnected: true
			};
		case CONNECTION_LOST:
			return {
				serverName: "",
				serverMsgs: [],
				userChannels: [],
				joinableChannels: {
					pages: 0,
					channels: [],
					channelCount: 0
				},
				isConnected: false,
				ircSocket: null
			};
		case GRABBING_CHANNEL_LIST:
			return {
				...state,
				isGrabbingChannels: true
			};
		case UPDATE_CHANNELS_COUNT:
			return {
				...state,
				joinableChannels: {
					pages: state.joinableChannels.pages + 1,
					channelCount: state.joinableChannels.channelCount + action.payload
				}
			};
		case GRABBING_CHANNEL_LIST_END:
			return {
				...state,
				isGrabbingChannels: false,
				joinableChannels: {
					...state.joinableChannels,
					channels: action.payload
				}
			};
		case NOTICE_MESSAGE:
			return {
				...state,
				serverMsgs: [...state.serverMsgs, `-${action.payload.nick}- ${action.payload.message}`]
			};
		case MOTD_MESSAGE:
			return {
				...state,
				serverMsgs: [...state.serverMsgs, action.payload]
			};
		case CHANNEL_NOTICE:
			return {
				...state,
				userChannels: state.userChannels.map(c => {
					let { messages, messagesCount } = CheckIfOverMessageLimit(c, 2000);
					return c.channelName.toLowerCase() === action.payload.channelName.toLowerCase()
						? {
								...c,
								messages: [...messages, `-${action.payload.nick}- ${action.payload.message}`],
								messagesCount: messagesCount++
						  }
						: c;
				})
			};
		case CHANNEL_MESSAGE:
			const channel = state.userChannels.find(
				({ channelName }) => channelName.toLowerCase() === action.payload.channel.toLowerCase()
			);
			if (channel) {
				const { nick, ident, hostname, status, channel, message } = action.payload;
				return {
					...state,
					userChannels: state.userChannels.map(c => {
						let { messages, messagesCount } = CheckIfOverMessageLimit(c, 2000);
						return c.channelName.toLowerCase() === channel.toLowerCase()
							? {
									...c,
									messages: [
										...messages,
										`${nick} [${ident}@${hostname}] has ${status} ${channel} ${
											status === "left" ? `[${message}]` : ""
										}`
									],
									messagesCount: messagesCount++
							  }
							: c;
					})
				};
			} else {
				//channel not in array yet so create a channel object for the new channel
				return {
					...state,
					userChannels: [
						...state.userChannels,
						{
							channelName: action.payload.channel,
							messages: [],
							userList: [],
							messagesCount: 0
						}
					]
				};
			}
		case CHANNEL_PRV_MSG:
			return {
				...state,
				userChannels: state.userChannels.map(c => {
					let { messages, messagesCount } = CheckIfOverMessageLimit(c, 2000);
					return c.channelName.toLowerCase() === action.payload.target.toLowerCase()
						? {
								...c,
								messages: [...messages, `<${action.payload.nick}> ${action.payload.message}`],
								messagesCount: messagesCount++
						  }
						: c;
				})
			};
		case UPDATE_USERS_LIST:
			return {
				...state,
				userChannels: state.userChannels.map(c =>
					c.channelName.toLowerCase() === action.payload.channelName.toLowerCase()
						? { ...c, userList: action.payload.users }
						: c
				)
			};
		case LEAVE_CHANNEL:
			return {
				...state,
				userChannels: state.userChannels.filter(
					c => c.channelName.toLowerCase() !== action.payload.toLowerCase()
				)
			};
		default:
			return state;
	}
};

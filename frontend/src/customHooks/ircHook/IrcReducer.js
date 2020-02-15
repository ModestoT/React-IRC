import { GrabServerName, CheckIfOverMessageLimit } from "../../helpers/IrcHelpers.js";
import { AddChannelToPastConfigs } from "../../helpers/GeneralHelpers.js";
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
export const CREATE_PRV_MSG_TAB = "CREATE_PRV_MSG_TAB";

export const IrcReducer = (state, action) => {
	let channel;
	switch (action.type) {
		case MAKING_CONNECTION:
			const ircSocket = CreateIrcConnection(action.payload.ircOptions, action.payload.saveConfig);

			return {
				...state,
				nick: action.payload.nick,
				serverName: GrabServerName(action.payload.ircOptions.host),
				isSaveConfig: action.payload.isSaveConfig,
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
								messagesCount: messagesCount + 1
						  }
						: c;
				})
			};
		case CHANNEL_MESSAGE:
			channel = state.userChannels.find(
				({ channelName }) => channelName.toLowerCase() === action.payload.channel.toLowerCase()
			);
			if (channel) {
				const { nick, ident, hostname, status, channel, message, users } = action.payload;
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
									messagesCount: messagesCount + 1,
									userList: users
							  }
							: c;
					})
				};
			} else {
				//channel not in array yet so create a channel object for the new channel
				AddChannelToPastConfigs(action.payload.channel, state.serverName);

				return {
					...state,
					userChannels: [
						...state.userChannels,
						{
							channelName: action.payload.channel,
							messages: [],
							userList: action.payload.users,
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
								messagesCount: messagesCount + 1
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
		case PERSONAL_MSG:
			channel = state.userChannels.find(
				({ channelName }) => channelName.toLowerCase() === action.payload.sentFrom.toLowerCase()
			);

			if (channel) {
				return {
					...state,
					userChannels: state.userChannels.map(c => {
						let { messages, messagesCount } = CheckIfOverMessageLimit(c, 2000);
						return c.channelName.toLowerCase() === action.payload.sentFrom.toLowerCase()
							? {
									...c,
									messages: [...messages, `<${action.payload.sentFrom}> ${action.payload.message}`],
									messagesCount: messagesCount + 1
							  }
							: c;
					})
				};
			} else {
				return {
					...state,
					userChannels: [
						...state.userChannels,
						{
							channelName: action.payload.sentFrom,
							messages: [`<${action.payload.sentFrom}> ${action.payload.message}`],
							userList: [],
							messagesCount: 1
						}
					]
				};
			}
		case CREATE_PRV_MSG_TAB:
			return {
				...state,
				userChannels: [
					...state.userChannels,
					{
						channelName: action.payload,
						messages: [],
						userList: [],
						messagesCount: 0
					}
				]
			};
		default:
			return state;
	}
};

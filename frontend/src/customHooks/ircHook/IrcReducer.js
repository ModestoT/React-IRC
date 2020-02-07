import { createIrcConnection, grabServerName } from "../../helpers/IrcHelpers.js";

export const CONNECTION_ESTABLISHED = "CONNECTION_ESTABLISHED";
export const CONNECTION_LOST = "CONNECTION_LOST";
export const NOTICE_MESSAGE = "NOTICE_MESSAGE";
export const MOTD_MESSAGE = "MOTD_MESSAGE";
export const CHANNEL_NOTICE = "CHANNEL_NOTICE";
export const CHANNEL_MESSAGE = "CHANNEL_MESSAGE";
export const MAKING_CONNECTION = "MAKING_CONNECTION";
export const GRABBING_CHANNEL_LIST = 'GRABBING_CHANNEL_LIST';
export const UPDATE_CHANNELS_COUNT = 'UPDATE_CHANNELS_COUNT';
export const GRABBING_CHANNEL_LIST_END = 'GRABBING_CHANNEL_LIST_END';

export const IrcReducer = (state, action) => {
  switch(action.type){
    case MAKING_CONNECTION:
      const ircSocket = createIrcConnection(action.payload);

      return {
        ...state,
        serverName: grabServerName(action.payload.host),
        ircSocket
      }
    case CONNECTION_ESTABLISHED:
      console.log("connected to irc")
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
          channels:[],
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
        userChannels: state.userChannels.map(channel => channel.channelName === action.payload.channelName ? {...channel, messages: [...channel.messages, `-${action.payload.nick}- ${action.payload.message}`]} : channel)
      };
    case CHANNEL_MESSAGE:
      const channel = state.userChannels.find(({ channelName }) => channelName === action.payload.channel);
      if(channel){
        const {nick, ident, hostname, status, channel, message} = action.payload;
        return {
          ...state,
          userChannels: state.userChannels.map(c => 
            c.channelName === channel ? 
              {...c, messages: [...c.messages, `${nick} [${ident}@${hostname}] has ${status} ${channel} ${status === "left" ? `[${message}]` : ""}`]}
            : c
          )
        };
      } else {
        return {
          ...state,
          userChannels: [...state.userChannels, {
            channelName: action.payload.channel,
            messages: [],
            userList: [],
          }]
        }
      }
    default:
      return state;
  }
}
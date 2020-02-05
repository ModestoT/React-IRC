import { createIrcConnection, grabServerName } from "../../helpers/IrcHelpers.js";

export const CONNECTION_ESTABLISHED = 'CONNECTION_ESTABLISHED';
export const CONNECTION_LOST = 'CONNECTION_LOST';
export const NOTICE_MESSAGE = 'NOTICE_MESSAGE';
export const MOTD_MESSAGE = 'MOTD_MESSAGE';
export const CHANNEL_NOTICE = 'CHANNEL_NOTICE';
export const CHANNEL_MESSAGE = 'CHANNEL_MESSAGE';
export const MAKING_CONNECTION = 'MAKING_CONNECTION';

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
        ...state,
        isConnected: false
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
        channels: state.channels.map(channel => channel.channelName === action.payload.channelName ? {...channel, messages: [...channel.messages, `-${action.payload.nick}- ${action.payload.message}`]} : channel)
      };
    case CHANNEL_MESSAGE:
      const channel = state.channels.find(({ channelName }) => channelName === action.payload.channel);
      if(channel){
        const {nick, ident, hostname, status, channel, message} = action.payload;
        return {
          ...state,
          channels: state.channels.map(c => 
            c.channelName === channel ? 
              {...c, messages: [...c.messages, `${nick} [${ident}@${hostname}] has ${status} ${channel} ${status === 'left' ? `[${message}]` : ''}`]}
            : c
          )
        };
      } else {
        return {
          ...state,
          channels: [...state.channels, {
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
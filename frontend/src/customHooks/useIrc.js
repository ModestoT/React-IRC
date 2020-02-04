import {useReducer,useEffect} from "react";

import {createIrcConnection,parseForChannelName,grabServerName} from "../helpers/IrcHelpers.js";
// const channel = {
//   channelName: '',
//   hostname: '',
//   messages: [],
//   userList: []
// }

const ircReducer = (state, action) => {
  switch(action.type){
    case 'notice':
      return {
        ...state,
        serverMsgs: [...state.serverMsgs, `-${action.payload.nick}- ${action.payload.message}`]
      };
    case 'motd': 
      return {
        ...state,
        serverMsgs: [...state.serverMsgs, action.payload]
      };
    case 'channel notice': 
      return {
        ...state,
        channels: state.channels.map(channel => channel.channelName === action.payload.channelName ? {...channel, messages: [...channel.messages, `-${action.payload.nick}- ${action.payload.message}`]} : channel)
      };
    case 'channel message':
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
  export const useIrc = ircOptions => {
    const [state, dispatch] = useReducer(ircReducer,{
      serverName: grabServerName(ircOptions.host),
      serverMsgs: [],
      channels: []
    });

    useEffect(() => {
      const ircSocket = createIrcConnection(ircOptions);
      
      ircSocket.on("irc notice", notice => {
        const channelName = parseForChannelName(notice.message);
        
        if(!channelName || channelName[0] !== '#'){
          dispatch({ type: 'notice', payload: notice });
        } else{
          dispatch({ type: 'channel notice', payload: {...notice, channelName}});
        }
      }).on("joined channel", e => {
        dispatch({ type: 'channel message', payload: {...e, status: 'joined' } });
      }).on("left channel", e => {
        dispatch({ type: 'channel message', payload: {...e, status: 'left' } });
      }).on("server motd", motd => {
        dispatch({ type: 'motd', payload: motd });
      })
    },[ircOptions]);

  return state;
}
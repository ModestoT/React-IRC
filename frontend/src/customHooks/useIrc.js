import {useReducer,useEffect} from "react";

import {createIrcConnection,parseForChannelName} from "../helpers/IrcHelpers.js";
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
      }
    case 'channel notice': 
      return {
        ...state,
        channels: state.channels.map(channel => channel.channelName === action.payload.channelName ? {...channel, messages: [...channel.messages, `-${action.payload.nick}- ${action.payload.message}`]} : channel)
      };
    case 'channel':
      const channel = state.channels.find(({ channelName }) => channelName === action.payload.channel);
      if(channel){
        return {
          ...state,
          channels: state.channels.map(channel => 
            channel.channelName === action.payload.channel ? 
              {...channel, messages: [...channel.messages, `${action.payload.nick} [${action.payload.ident}@${action.payload.hostname}] has joined ${action.payload.channel}`]}
            : channel)
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
        dispatch({ type: 'channel', payload: e });

      }).on("server motd", motd => {
        dispatch({ type: 'motd', payload: motd });

      })
    },[ircOptions]);

  return state;
}

const grabServerName = serverUrl => {
  const servername = serverUrl.split('.');

  return servername[1];
}
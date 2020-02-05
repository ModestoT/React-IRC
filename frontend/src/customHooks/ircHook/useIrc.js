import { useReducer, useEffect } from "react";

import { parseForChannelName } from "../../helpers/IrcHelpers.js";
import { 
  IrcReducer, 
  NOTICE_MESSAGE, 
  CHANNEL_NOTICE, 
  CHANNEL_MESSAGE, 
  MOTD_MESSAGE, 
  CONNECTION_ESTABLISHED, 
  CONNECTION_LOST,
  MAKING_CONNECTION 
} from "./IrcReducer.js";

// const channel = {
//   channelName: '',
//   hostname: '',
//   messages: [],
//   userList: []
// }
export const useIrc = () => {
  const [state, dispatch] = useReducer(IrcReducer,{
    serverName: '',
    serverMsgs: [],
    channels: [],
    isConnected: false,
    ircSocket: null
  });

  useEffect(() => {
    if(state.ircSocket){
      state.ircSocket.on("connected", () => {
        dispatch({ type: CONNECTION_ESTABLISHED });
      }).on("disconnect", reason => {
        dispatch({ type: CONNECTION_LOST });
        console.log("Diconnected from irc: ", reason);
        state.ircSocket.close();
      }).on("irc notice", notice => {
        const channelName = parseForChannelName(notice.message);
        
        if(!channelName || channelName[0] !== '#'){
          dispatch({ type: NOTICE_MESSAGE, payload: notice });
        } else{
          dispatch({ type: CHANNEL_NOTICE, payload: {...notice, channelName}});
        }
      }).on("joined channel", e => {
        dispatch({ type: CHANNEL_MESSAGE, payload: {...e, status: 'joined' } });
      }).on("left channel", e => {
        dispatch({ type: CHANNEL_MESSAGE, payload: {...e, status: 'left' } });
      }).on("server motd", motd => {
        dispatch({ type: MOTD_MESSAGE, payload: motd });
      });
    }  
  },[state.ircSocket]);
  
  const connectToIrc = (ircOptions, e) => {
    e.preventDefault();

    dispatch({ type: MAKING_CONNECTION, payload: ircOptions });
  };

  return {
    state,
    connectToIrc
  };
}
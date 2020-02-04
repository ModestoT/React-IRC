import React, {useEffect,useRef} from "react";

import { useIrc } from "../customHooks/useIrc.js";

const IrcChatView = ({ ircOptions }) => {
  const divRef = useRef(null);
  const {serverName, serverMsgs, channels} = useIrc(ircOptions);

  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  },[channels])

  return(
    <div>
      <div className="irc-channels">
        <div className="server-tab">
          <h2>{serverName}</h2>
          <div className="irc-chat" style={{width:'50%', height:'300px', overflow:'auto', wordBreak:'break-word', margin:'5% auto', border:'1px solid', padding:'1%'}} ref={divRef}>
            {serverMsgs.map(msg => {
              return <p style={{whiteSpace: "pre-wrap", margin: "5px"}}>{msg}</p>
            })}
          </div>
        </div>
        {channels.map(channel => {
          return(
            <div className={`${channel.channelName}-tab`}>
              <h2>{channel.channelName}</h2>
              <div className="irc-chat" style={{width:'50%', height:'300px', overflow:'auto', wordBreak:'break-word', margin:'5% auto', border:'1px solid', padding:'1%'}}>
                {channel.messages.map(msg => {
                  return <p style={{whiteSpace: "pre-wrap", margin: "5px"}}>{msg}</p>
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default IrcChatView;
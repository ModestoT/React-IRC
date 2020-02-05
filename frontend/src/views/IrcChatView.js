import React from "react";
import IrcChatTab from "../components/irc/IrcChatTab";

const IrcChatView = ({ state }) => {
  const {serverName, serverMsgs, channels} = state;

  return(
    <div>
      <IrcChatTab tabName={serverName} chatMsgs={serverMsgs}/>
      {channels.map(channel => {
        return(
          <IrcChatTab key={channel.channelName} tabName={channel.channelName} chatMsgs={channel.messages}/>
        );
      })}
      <button className="join-channel" onClick={() => {}}>+</button>
    </div>
  );
};


export default IrcChatView;
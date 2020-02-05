import React from "react";
import IrcChat from "./IrcChat";

const IrcChatTab = ({ tabName, chatMsgs }) => {
  return (
    <div className="irc-chat-tab">
      <h2>{tabName}</h2>
      <IrcChat chatMsgs={chatMsgs}/>
    </div>
  );
};

export default IrcChatTab;
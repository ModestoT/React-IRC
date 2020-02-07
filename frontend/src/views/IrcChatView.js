import React, { useState } from "react";

import IrcChatTab from "../components/irc/IrcChatTab";
import Modal from "../components/Modal";
import IrcJoinableChannels from "../components/irc/IrcJoinableChannels";

const IrcChatView = ({ state, joinIrcChannel, grabAvailableChannels, searchForChannel, resetSearchResArray }) => {
  const [isToggled, setIsToggled] = useState(false);
  const { serverName, serverMsgs, userChannels, joinableChannels, isGrabbingChannels, searchRes } = state;

  const toggleModal = () => {
    if(joinableChannels.pages === 0 ){
      grabAvailableChannels();
    }

    setIsToggled(!isToggled);
  }

  return(
    <div>
      <IrcChatTab tabName={serverName} chatMsgs={serverMsgs}/>
      {userChannels.map(channel => {
        return(
          <IrcChatTab key={channel.channelName} tabName={channel.channelName} chatMsgs={channel.messages}/>
        );
      })}
      <button className="join-channel" onClick={() => toggleModal()}>+</button>
      <Modal showModal={isToggled} toggleModal={setIsToggled}>
        <IrcJoinableChannels
          joinableChannels={joinableChannels} 
          joinIrcChannel={joinIrcChannel} 
          isGrabbingChannels={isGrabbingChannels} 
          searchRes={searchRes}
          searchForChannel={searchForChannel}
          resetSearchResArray={resetSearchResArray}
        />
      </Modal>
    </div>
  );
};


export default IrcChatView;
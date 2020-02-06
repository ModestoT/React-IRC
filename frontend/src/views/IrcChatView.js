import React, { useState } from "react";
import IrcChatTab from "../components/irc/IrcChatTab";
import Modal from "../components/Modal";
import { useFormInput } from "../customHooks/useFormInput";

const IrcChatView = ({ state, joinIrcChannel, grabAvailableChannels }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [channelSearch, setChannelSearch] = useFormInput('');
  const { serverName, serverMsgs, userChannels, joinableChannels } = state;

  const toggleModal = () => {
    if(joinableChannels.pages === 0 ){
      grabAvailableChannels();
    }
    
    setIsToggled(true);
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
        <input type="text" value={channelSearch} onChange={e => setChannelSearch(e.target.value)} />
        {joinableChannels.pages > 0 ? joinableChannels.channels[0].map(channel => {
          return (
            <div>
              <h3>{channel.channel}</h3>
            </div>
          )
        }): <div></div>}
      </Modal>
    </div>
  );
};


export default IrcChatView;
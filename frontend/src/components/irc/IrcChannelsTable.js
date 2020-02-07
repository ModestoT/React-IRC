import React from "react";

import IrcChannel from "./IrcChannel";

const IrcChannelsTable = ({ channels, currentPage, joinIrcChannel, toggleModal }) => {
  return (
    <table style={{width: "100%"}}>
      <tbody>
        {channels[currentPage].map(channel => {
          return <IrcChannel key={channel.channel} joinableChannel={channel} joinIrcChannel={joinIrcChannel} toggleModal={toggleModal}/>
        })}
      </tbody>
    </table>
  )
};

export default IrcChannelsTable;
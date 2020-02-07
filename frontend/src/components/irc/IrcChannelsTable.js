import React from "react";

import IrcChannel from "./IrcChannel";

const IrcChannelsTable = ({ channels, currentPage }) => {
  return (
    <table style={{width: "100%"}}>
      <tbody>
        {channels[currentPage].map(channel => {
          return <IrcChannel key={channel.channel} joinableChannel={channel} joinIrcChannel={joinIrcchannel} />
        })}
      </tbody>
    </table>
  )
};

export default IrcChannelsTable;
import React from "react";

const IrcChannel = ({ joinableChannel, joinIrcChannel }) => {
  const { channel, topic, num_users } = joinableChannel;
  return (
    <tr>
      <td>Users: {num_users}</td>
      <td>{channel}</td>
      <td>{topic}</td>
      <td>
        <button onClick={() => joinIrcChannel(channel)}>JOIN</button>
      </td>
    </tr>
  );
};

export default IrcChannel;
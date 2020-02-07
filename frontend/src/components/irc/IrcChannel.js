import React from "react";

const IrcChannel = ({ joinableChannel, joinIrcChannel, toggleModal }) => {
  const { channel, topic, num_users } = joinableChannel;
  const handleChannelJoin = () => {
    joinIrcChannel(channel);
    toggleModal();
  }
  return (
    <tr>
      <td>Users: {num_users}</td>
      <td>{channel}</td>
      <td>{topic}</td>
      <td>
        <button onClick={() => handleChannelJoin()}>JOIN</button>
      </td>
    </tr>
  );
};

export default IrcChannel;
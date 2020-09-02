import React from "react";

const IrcChatMsg = ({ msg }) => {
  return (
    <p style={{whiteSpace: "pre-wrap", margin: "5px"}}>{msg}</p>
  );
};

export default IrcChatMsg;
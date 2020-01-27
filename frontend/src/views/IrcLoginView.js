import React from "react";
import InputField from "../components/InputField.js";

const IrcLoginView = ({ ircOptions, handleInput }) => {
  const {
    host, 
    port, 
    nick, 
    ssl 
  } = ircOptions;
  return(
    <form className="irc-login-form">
      <InputField 
        type={"text"} 
        labelText={"Server"} 
        className={"irc-hostname"} 
        value={host} 
        onChange={e => handleInput({host: e.target.value})}
      />
      <InputField 
        type={"number"} 
        labelText={"Port"} 
        className={"irc-port"} 
        value={port} 
        onChange={e => handleInput({port: e.target.value})}
      />
      <InputField 
        type={"text"} 
        labelText={"Nickname"} 
        className={"irc-nick"} 
        value={nick} 
        onChange={e => handleInput({nick: e.target.value})}
      />
      <InputField 
        type={"checkbox"} 
        labelText={"Secure Connection"} 
        className={"irc-ssl"} 
        checked={ssl} 
        value={"Secure Connection"}
        onChange={() => handleInput({ssl: !ssl})}
      />
    </form>
  );
};

export default IrcLoginView;
import React from "react";

import { useFormInput } from "../customHooks/useFormInput.js";
import InputField from "../components/InputField.js";

const IrcLoginView = ({ connectToIrc }) => {
	const [ircOptions, handleInput] = useFormInput({
		host: "",
		port: 6667,
		nick: "",
		ssl: false
	});
	const [isSaveConfig, setIsSaveConfig] = useFormInput(false);

	return (
		<form className="irc-login-form" onSubmit={e => connectToIrc(e, ircOptions, isSaveConfig)}>
			<h2>Connect To an Irc Server</h2>
			<InputField
				type="text"
				labelText="Server"
				className="irc-hostname"
				value={ircOptions.host}
				onChange={e => handleInput({ host: e.target.value })}
			/>
			<InputField
				type="number"
				labelText="Port"
				className="irc-port"
				value={ircOptions.port}
				onChange={e => handleInput({ port: e.target.value })}
			/>
			<InputField
				type="text"
				labelText="Nickname"
				className="irc-nick"
				value={ircOptions.nick}
				onChange={e => handleInput({ nick: e.target.value })}
			/>
			<InputField
				type="checkbox"
				labelText="Secure Connection"
				className="irc-ssl"
				checked={ircOptions.ssl}
				value="Secure Connection"
				onChange={() => handleInput({ ssl: !ircOptions.ssl, port: !ircOptions.ssl ? 6697 : 6667 })}
			/>
			<InputField
				type="checkbox"
				labelText="Save Config?"
				className="irc-save-config"
				checked={isSaveConfig}
				value="Save Config"
				onChange={() => setIsSaveConfig(!isSaveConfig)}
			/>
			<button className="connect">Connect</button>
		</form>
	);
};

export default IrcLoginView;

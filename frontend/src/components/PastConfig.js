import React from "react";

const PastConfig = ({ config, connectToIrc, currentServer, deleteConfig }) => {
	const { host, port, nick, ssl } = config;
	const isDisabled = currentServer.length > 0 ? host.includes(currentServer) : false;
	return (
		<li>
			<p>Server: {host}</p>
			<p>Port: {port}</p>
			<p>Nick: {nick}</p>
			<p>Secure Connection: {ssl ? "true" : "false"}</p>
			<button onClick={e => connectToIrc(e, config, false)} disabled={isDisabled}>
				connect
			</button>
			<button onClick={() => deleteConfig(config.id)}>delete</button>
		</li>
	);
};

export default PastConfig;

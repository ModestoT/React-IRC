import React from "react";

import { useFormInput } from "../../customHooks/useFormInput.js";
import { FixChannelName } from "../../helpers/IrcHelpers.js";

const IrcInputField = ({ currentChannel, sendMessageToChannel, joinIrcChannel, nick }) => {
	const [message, setMessage] = useFormInput("");

	const handleMessageToChannel = e => {
		e.preventDefault();

		if (message[0] === "/") {
			const action = message.split(" ");
			switch (action[0]) {
				case "/join":
					if (action[1]) {
						joinIrcChannel(FixChannelName(action[1]));
					}
					break;
				case "/away":
					break;
				case "/back":
					break;
				default:
					return null;
			}
		} else {
			sendMessageToChannel(currentChannel, message, nick);
		}

		setMessage("");
	};
	//TODO: Add checks for / commands, ex: /join, /message to user(look into this)
	//Implement ability to join server/channels from localstorage, add previously joined config to localstorage
	//afterwords begin work on UI
	return (
		<form onSubmit={e => handleMessageToChannel(e)}>
			<input
				type="text"
				value={message}
				onChange={e => setMessage(e.target.value)}
				spellCheck="true"
			/>
		</form>
	);
};

export default IrcInputField;

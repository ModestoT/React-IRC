import React from "react";

import { useFormInput } from "../../customHooks/useFormInput.js";
import { FixChannelName } from "../../helpers/IrcHelpers.js";

const IrcInputField = ({
	currentChannel,
	sendMessageToChannel,
	joinIrcChannel,
	nick,
	setUserAsAway,
	setUserAsBack,
	createPrvMsgTab
}) => {
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
					setUserAsAway();
					break;
				case "/back":
					setUserAsBack();
					break;
				case "/message":
					createPrvMsgTab(action[1]);
					break;
				default:
					return null;
			}
		} else {
			sendMessageToChannel(currentChannel, message, nick);
		}

		setMessage("");
	};
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

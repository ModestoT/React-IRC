import React from "react";

import { useFormInput } from "../../customHooks/useFormInput.js";

const IrcInputField = ({ currentChannel, sendMessageToChannel, nick }) => {
	const [message, setMessage] = useFormInput("");

	const handleMessageToChannel = e => {
		e.preventDefault();

		sendMessageToChannel(currentChannel, message, nick);
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

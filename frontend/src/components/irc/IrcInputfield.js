import React from "react";
import styled from "styled-components";

import Button from "../Button.js";
import { useFormInput } from "../../customHooks/useFormInput.js";
import { FixChannelName } from "../../helpers/IrcHelpers.js";

const IrcTextBox = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90%;

	@media (min-width: 1024px) {
		width: 97%;
	}

	input {
		width: 79%;
		background: ${(props) => props.theme.inputBg};
		color: ${(props) => props.theme.mainText};
		border-radius: 15px;
		border: none;
		padding: 1%;
		outline: none;

		@media (min-width: 1024px) {
			width: 95%;
			padding: 0.5%;
		}
	}

	button {
		margin-left: 10px;
	}
`;

const IrcInputField = ({
	currentChannel,
	sendMessageToChannel,
	joinIrcChannel,
	nick,
	setUserAsAway,
	setUserAsBack,
	sendPrivMsg,
}) => {
	const [message, setMessage] = useFormInput("");

	const handleMessageToChannel = (e) => {
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
					const data = { target: action[1], message: action.slice(2).join(" ") };
					sendPrivMsg(data);
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
		<IrcTextBox onSubmit={(e) => handleMessageToChannel(e)}>
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				spellCheck="true"
				placeholder={`Send message to ${currentChannel}`}
			/>
			<Button btnText="Send" margin={2} padding={[5, 8]} />
		</IrcTextBox>
	);
};

export default IrcInputField;

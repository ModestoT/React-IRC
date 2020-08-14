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
		width: 95%;
		background: ${(props) => props.theme.inputBg};
		color: ${(props) => props.theme.mainText};
		border-radius: 15px;
		border: none;
		padding: 1%;
		outline: none;

		@media (min-width: 1024px) {
			padding: 0.5%;
		}
	}
`;

const IrcInputField = ({
	currentChannel,
	sendMessageToChannel,
	joinIrcChannel,
	nick,
	setUserAsAway,
	setUserAsBack,
	createPrvMsgTab,
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
		<IrcTextBox onSubmit={(e) => handleMessageToChannel(e)}>
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				spellCheck="true"
				placeholder={`Send message to ${currentChannel}`}
			/>
			<Button btnText="Send" margin={5} padding={[5, 8]} />
		</IrcTextBox>
	);
};

export default IrcInputField;

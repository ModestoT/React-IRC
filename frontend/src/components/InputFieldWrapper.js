import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";

import IrcInputField from "./irc/IrcInputfield.js";

const IFwrapper = styled.div`
	display: flex;
	align-items: center;
	height: 5%;
`;

const PMwrapper = styled.button`
	cursor: pointer;
	border: none;
	background: none;
	width: 10%;
	padding: 0;
	font-size: 1.1rem;
	color: ${(props) => props.theme.btnBg};

	&:hover {
		background: #808075;
		border-radius: 4px;
		color: white;
	}

	@media (min-width: 1024px) {
		width: 2.5%;
		font-size: 1.5rem;
		height: 68%;
	}
`;
// NEXT STEPS: Implement private messaging with new navigation design
// create a message notification button near the text input field
// need an array to keep track of amount of private messages a user has
// show length of the array on the button
// when button is clicked shows the private messages, when a message is selected
// the small window turns into a small chat window for the private messages
// Similar to twitch design

const InputFieldWrapper = ({
	currentChannel,
	sendMessageToChannel,
	handleJoinIrcChannel,
	nick,
	setUserAsAway,
	setUserAsBack,
	handleCreatePrvMsg,
}) => {
	return (
		<IFwrapper>
			<IrcInputField
				currentChannel={currentChannel}
				sendMessageToChannel={sendMessageToChannel}
				joinIrcChannel={handleJoinIrcChannel}
				nick={nick}
				setUserAsAway={setUserAsAway}
				setUserAsBack={setUserAsBack}
				createPrvMsgTab={handleCreatePrvMsg}
			/>
			<PMwrapper>
				<FontAwesomeIcon icon={faCommentAlt} />
			</PMwrapper>
		</IFwrapper>
	);
};

export default InputFieldWrapper;

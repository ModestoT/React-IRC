import React from "react";
import styled from "styled-components";

import IrcInputField from "./irc/IrcInputfield.js";
import IrcPrivMsgButton from "./irc/IrcPrivMsgButton.js";

const IFwrapper = styled.div`
	display: flex;
	align-items: center;
	height: 5%;
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
	sendPrivMsg,
	privateMsgs,
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
				sendPrivMsg={sendPrivMsg}
			/>
			<IrcPrivMsgButton privateMsgs={privateMsgs} />
		</IFwrapper>
	);
};

export default InputFieldWrapper;

import React from "react";
import styled from "styled-components";

import IrcInputField from "./irc/IrcInputfield.js";
import IrcPrivMsgButton from "./irc/IrcPrivateMsgs/IrcPrivMsgButton.js";

const IFwrapper = styled.div`
	display: flex;
	align-items: center;
	height: 5%;
`;

const StatusDot = styled.span`
	height: 15px;
	width: 15px;
	background-color: ${(props) => (props.away ? "red" : "green")};
	border-radius: 50%;
	margin-right: 5px;
`;

const UserWrapper = styled.div`
	cursor: pointer;
	display: flex;
	aling-items: center;
	padding: 4px;
	border: 1px solid ${(props) => props.theme.inputBg};
	border-radius: 5px;
	margin: 0 5px;

	p {
		margin: 0;
	}

	&:hover {
		border: 1px solid ${(props) => props.theme.mainText};
	}
`;

const InputFieldWrapper = ({
	currentChannel,
	sendMessageToChannel,
	handleJoinIrcChannel,
	nick,
	away,
	setUserAsAway,
	setUserAsBack,
	sendPrivMsg,
	privateMsgs,
	totalUnreadMessages,
	updateReadMessages,
}) => {
	return (
		<IFwrapper>
			<UserWrapper>
				<StatusDot away={away} />
				<p>{nick}</p>
			</UserWrapper>
			<IrcInputField
				currentChannel={currentChannel}
				sendMessageToChannel={sendMessageToChannel}
				joinIrcChannel={handleJoinIrcChannel}
				nick={nick}
				setUserAsAway={setUserAsAway}
				setUserAsBack={setUserAsBack}
				sendPrivMsg={sendPrivMsg}
			/>
			<IrcPrivMsgButton
				privateMsgs={privateMsgs}
				totalUnreadMessages={totalUnreadMessages}
				updateReadMessages={updateReadMessages}
				sendPrivMsg={sendPrivMsg}
			/>
		</IFwrapper>
	);
};

export default InputFieldWrapper;

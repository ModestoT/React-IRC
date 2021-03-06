import React, { useState } from "react";
import styled from "styled-components";
import InputField from "./InputField.js";

import IrcInputField from "./irc/IrcInputfield.js";
import IrcPrivMsgButton from "./irc/IrcPrivateMsgs/IrcPrivMsgButton.js";

const IFwrapper = styled.div`
	display: flex;
	align-items: center;
	height: 5%;
`;

const StatusDot = styled.span`
	display: block;
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
	padding: 2px;
	border: 1px solid ${(props) => props.theme.inputBg};
	border-radius: 5px;
	margin: 0 5px;

	p {
		margin: 0;
	}

	&:hover {
		border: 1px solid ${(props) => props.theme.mainText};
	}

	@media (min-width: 1024px) {
		padding: 4px;
	}
`;

const UserStatusWrapper = styled.div`
	background: ${(props) => props.theme.secondaryBg};
	position: absolute;
	bottom: 0;
	left: 0;
	width: 139px;
	height: 55px;
	border: 1px solid ${(props) => props.theme.inputBg};
	border-radius: 3px;
	padding: 8px;

	@media (min-width: 1024px) {
		right: 91%;
	}
`;

const CloseStatusWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 5px;

	span {
		cursor: pointer;

		&:hover {
			transform: scale(1.3);
		}
	}
`;

const UserStatus = styled.div`
	display: flex;

	p {
		margin: 0;
	}
`;

const InputFieldWrapper = ({
	currentChannel,
	sendMessageToChannel,
	joinIrcChannel,
	nick,
	away,
	setUserAsAway,
	setUserAsBack,
	sendPrivMsg,
	privateMsgs,
	totalUnreadMessages,
	updateReadMessages,
}) => {
	const [showUserStatus, setShowUserStatus] = useState(false);

	const changeUserStatus = (e) => {
		e.preventDefault();
		if (away === false) {
			console.log("running");
			setUserAsAway();
		} else {
			setUserAsBack();
		}
	};
	return (
		<IFwrapper>
			<UserWrapper onClick={() => setShowUserStatus(true)}>
				<StatusDot away={away} />
				<p>{nick}</p>
			</UserWrapper>
			{showUserStatus && (
				<UserStatusWrapper>
					<CloseStatusWrapper>
						<UserStatus>
							<StatusDot away={away} />
							<p>{nick}</p>
						</UserStatus>
						<span onClick={() => setShowUserStatus(false)}>X</span>
					</CloseStatusWrapper>
					<InputField
						id="awayStatus"
						type="checkbox"
						labelText="Away"
						value="Away status"
						checked={away}
						onChange={(e) => changeUserStatus(e)}
					/>
				</UserStatusWrapper>
			)}
			<IrcInputField
				currentChannel={currentChannel}
				sendMessageToChannel={sendMessageToChannel}
				joinIrcChannel={joinIrcChannel}
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

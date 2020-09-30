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

const UserStatusWrapper = styled.div`
	background: ${(props) => props.theme.secondaryBg};
	position: absolute;
	top: 89%;
	right: 62%;
	width: 139px;
	height: 55px;
	border: 1px solid ${(props) => props.theme.inputBg};
	border-radius: 3px;
	padding: 8px;

	@media (min-width: 1024px) {
		top: 92%;
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

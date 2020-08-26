import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";

import IrcPrivMsg from "./IrcPrivMsg";

const PMbuttonwrapper = styled.button`
	display: flex;
	justify-content: center;
	cursor: pointer;
	border: none;
	background: none;
	width: 9%;
	padding: 1%;
	font-size: 1.1rem;
	color: ${(props) => props.theme.btnBg};

	&:hover {
		background: #808075;
		border-radius: 4px;
		color: white;
	}

	&:focus {
		outline: none;
	}

	@media (min-width: 1024px) {
		width: 2.5%;
		font-size: 1.5rem;
		height: 68%;
	}
`;

const UnreadMsgs = styled.span`
	background: red;
	color: white;
	border-radius: 50%;
	position: absolute;
	font-size: 0.8rem;
	right: 1%;
	bottom: 2%;
	padding: 0.1% 0.7%;
`;

const ReceivedMsgsWrapper = styled.div`
	position: absolute;
	border: 1px solid white;
	right: 1%;
	bottom: 4%;
	width: 150px;
	height: 200px;
	background: black;
`;

// TODO: for the method of setting messages as seen. Since each message is added to an object of a user that sent the message
// when can turn the message into an object as well and add a seen key to it. When it's mapped we can set the unseen messages to seen
// and we will display the amount of unseen messages from that user as well on the overview of the private messages.

const IrcPrivMsgButton = ({ privateMsgs }) => {
	const { unreadPrivMsgs, receivedMessages } = privateMsgs;
	const [showMessages, setShowMessages] = useState(false);

	return (
		<>
			<PMbuttonwrapper onClick={() => setShowMessages(!showMessages)}>
				<FontAwesomeIcon icon={faCommentAlt} />
				{unreadPrivMsgs > 0 && <UnreadMsgs>{unreadPrivMsgs}</UnreadMsgs>}
			</PMbuttonwrapper>
			{showMessages && (
				<ReceivedMsgsWrapper>
					{receivedMessages.map((recMsg) => {
						return <IrcPrivMsg key={recMsg.user} recievedMsg={recMsg} />;
					})}
				</ReceivedMsgsWrapper>
			)}
		</>
	);
};

export default IrcPrivMsgButton;

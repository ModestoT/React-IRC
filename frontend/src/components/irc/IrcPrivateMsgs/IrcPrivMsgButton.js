import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";

import IrcPrivMsgs from "./IrcPrivMsgs";

const PMbuttonwrapper = styled.button`
	display: flex;
	justify-content: center;
	cursor: pointer;
	border: none;
	background: none;
	width: 50px;
	height: 80%;
	padding: 3px 5px;
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
		width: 3%;
		font-size: 1.5rem;
		height: 68%;
		padding: 5px;
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
	padding: 1px 5px;

	@media (min-width: 1024px) {
		right: 0.5%;
		bottom: 2.5%;
	}
`;

const IrcPrivMsgButton = ({
	privateMsgs,
	totalUnreadMessages,
	updateReadMessages,
	sendPrivMsg,
}) => {
	const [showMessages, setShowMessages] = useState(false);

	return (
		<>
			<PMbuttonwrapper onClick={() => setShowMessages(!showMessages)}>
				<FontAwesomeIcon icon={faCommentAlt} />
				{totalUnreadMessages > 0 && <UnreadMsgs>{totalUnreadMessages}</UnreadMsgs>}
			</PMbuttonwrapper>
			{showMessages && (
				<IrcPrivMsgs
					privateMsgs={privateMsgs}
					updateReadMessages={updateReadMessages}
					sendPrivMsg={sendPrivMsg}
				/>
			)}
		</>
	);
};

export default IrcPrivMsgButton;

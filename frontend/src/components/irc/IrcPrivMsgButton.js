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
	height: 100%;
	padding: 1.9% 0%;
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

const IrcPrivMsgButton = ({ privateMsgs, totalUnreadMessages, updateReadMessages }) => {
	const [showMessages, setShowMessages] = useState(false);
	const [userSelected, setUserSelected] = useState(null);

	const handleSelectUser = (privMsg) => {
		setUserSelected(privMsg);
		updateReadMessages(privMsg.user, privMsg.unReadMessages);
	};

	const handleDeselectUser = () => {
		setUserSelected(null);
	};

	return (
		<>
			<PMbuttonwrapper onClick={() => setShowMessages(!showMessages)}>
				<FontAwesomeIcon icon={faCommentAlt} />
				{totalUnreadMessages > 0 && <UnreadMsgs>{totalUnreadMessages}</UnreadMsgs>}
			</PMbuttonwrapper>
			{showMessages && (
				<ReceivedMsgsWrapper>
					{userSelected === null
						? privateMsgs.map((privMsg) => {
								return (
									<IrcPrivMsg
										key={privMsg.user}
										privMsg={privMsg}
										handleSelectUser={handleSelectUser}
									/>
								);
						  })
						: userSelected.messages.map((msg, index) => {
								return (
									<div key={index}>
										<h4>{userSelected.user}</h4>
										<p>{msg}</p>
									</div>
								);
						  })}
				</ReceivedMsgsWrapper>
			)}
		</>
	);
};

export default IrcPrivMsgButton;

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
	height: 80%;
	padding: 1.3% 0%;
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
	width: 45%;
	height: 40%;
	background: ${(props) => props.theme.mainBg};
	border: 1px solid ${(props) => props.theme.inputBg};
	border-radius: 3px;
	right: 1%;
	bottom: 4%;
`;

const PMHeader = styled.header`
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => props.theme.inputBg};
	border: 1px solid grey;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
	height: 11%;
`;

const PrivMsgWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 12%;
	padding: 0 3%;

	p {
		margin-left: 5px;
	}
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
					<PMHeader>
						<h3>{userSelected === null ? "Private Messages" : `${userSelected.user}`}</h3>
					</PMHeader>
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
									<PrivMsgWrapper key={index}>
										<h4>{userSelected.user}</h4>
										<p>{msg}</p>
									</PrivMsgWrapper>
								);
						  })}
				</ReceivedMsgsWrapper>
			)}
		</>
	);
};

export default IrcPrivMsgButton;

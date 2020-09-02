import React, { useState } from "react";
import styled from "styled-components";

import IrcPrivMsg from "./IrcPrivMsg";

const IrcPrivMsgsWrapper = styled.div`
	position: absolute;
	width: 45%;
	height: 40%;
	background: ${(props) => props.theme.mainBg};
	border: 1px solid ${(props) => props.theme.inputBg};
	border-radius: 3px;
	right: 1%;
	bottom: 4%;

	@media (min-width: 1024px) {
		width: 20%;
	}
`;

const PMHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
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
		margin-left: 15px;
	}
`;

const DeselectUser = styled.span`
	cursor: pointer;
	font-size: 1.5rem;
	margin: 5px 10px 8px 5px;

	@media (min-width: 1024px) {
		margin: 5px 80px 8px 5px;
	}
`;

const UserHeader = styled.h3`
	margin: 0 39% 0 23%;

	@media (min-width: 1024px) {
		margin: 0 43% 0 14%;
	}
`;

const IrcPrivMsgs = ({ privateMsgs, updateReadMessages }) => {
	const [userSelected, setUserSelected] = useState(null);

	const handleSelectUser = (privMsg) => {
		setUserSelected(privMsg);
		updateReadMessages(privMsg.user, privMsg.unReadMessages);
	};

	const handleDeselectUser = () => {
		setUserSelected(null);
	};

	return (
		<IrcPrivMsgsWrapper>
			<PMHeader>
				{userSelected === null ? (
					<h3>Private Messages</h3>
				) : (
					<>
						<DeselectUser onClick={() => handleDeselectUser()}>{"<"}</DeselectUser>
						<UserHeader>{userSelected.user}</UserHeader>
					</>
				)}
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
								<h4>{userSelected.sentFrom}</h4>
								<p>{msg}</p>
							</PrivMsgWrapper>
						);
				  })}
		</IrcPrivMsgsWrapper>
	);
};

export default IrcPrivMsgs;

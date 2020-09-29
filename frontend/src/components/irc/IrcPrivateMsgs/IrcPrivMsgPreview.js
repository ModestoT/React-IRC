import React from "react";
import styled from "styled-components";

const PrivMsgWrapper = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	height: 20%;
	border-bottom: 1px solid grey;
	padding: 0 3%;

	p {
		margin-left: 15px;
	}

	@media (min-width: 1024px) {
		height: 15%;
	}
`;

const UserNameWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 88%;

	h4,
	p {
		margin: 0;
	}

	p {
		font-size: 0.8rem;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

const UnreadMsgs = styled.span`
	background: red;
	color: white;
	border-radius: 50%;
	font-size: 0.9rem;
	padding: 3px 7px;
`;

const IrcPrivMsg = ({ privMsg, handleSelectUser }) => {
	const { user, messages, unReadMessages } = privMsg;
	return (
		<PrivMsgWrapper onClick={() => handleSelectUser(privMsg)}>
			<UserNameWrapper>
				<h4>{user}</h4>
				<p>{messages[messages.length - 1].msg}</p>
			</UserNameWrapper>
			{unReadMessages > 0 && <UnreadMsgs>{unReadMessages}</UnreadMsgs>}
		</PrivMsgWrapper>
	);
};

export default IrcPrivMsg;

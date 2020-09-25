import React from "react";
import styled from "styled-components";

const PrivMsgWrapper = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	height: 15%;
	border-bottom: 1px solid grey;
	padding: 0 3%;

	p {
		margin-left: 15px;
		overflow-wrap: anywhere;
	}
`;

const UnreadMsgs = styled.span`
	background: red;
	color: white;
	border-radius: 50%;
	font-size: 0.8rem;
	right: 1%;
	bottom: 2%;
	padding: 1px 5px;
	margin-right: 5px;

	@media (min-width: 1024px) {
		right: 0.5%;
		bottom: 2.5%;
	}
`;

const IrcPrivMsg = ({ privMsg, handleSelectUser }) => {
	const { user, messages, unReadMessages } = privMsg;
	return (
		<PrivMsgWrapper onClick={() => handleSelectUser(privMsg)}>
			{unReadMessages > 0 && <UnreadMsgs>{unReadMessages}</UnreadMsgs>}
			<h4>{user}</h4>
			<p>{messages[messages.length - 1].msg}</p>
		</PrivMsgWrapper>
	);
};

export default IrcPrivMsg;

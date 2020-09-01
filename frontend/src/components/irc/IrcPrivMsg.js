import React from "react";
import styled from "styled-components";

const PrivMsgWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 12%;
	border-bottom: 1px solid grey;
	padding: 0 3%;

	p {
		margin-left: 5px;
	}
`;

const IrcPrivMsg = ({ privMsg, handleSelectUser }) => {
	const { user, messages } = privMsg;
	return (
		<PrivMsgWrapper onClick={() => handleSelectUser(privMsg)}>
			<h4>{user}</h4>
			<p>{messages[messages.length - 1]}</p>
		</PrivMsgWrapper>
	);
};

export default IrcPrivMsg;

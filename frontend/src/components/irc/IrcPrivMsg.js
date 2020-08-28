import React from "react";
import styled from "styled-components";

const PrivMsgWrapper = styled.div`
	display: flex;
	align-items: center;
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

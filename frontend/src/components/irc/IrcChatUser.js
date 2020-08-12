import React from "react";
import styled from "styled-components";

const StatusDot = styled.span`
	height: 15px;
	width: 15px;
	background-color: ${(props) => (props.away ? "red" : "green")};
	border-radius: 50%;
	margin-right: 5px;
`;

const UserWrapper = styled.div`
	display: flex;
`;

const User = styled.li`
	cursor: pointer;
	text-overflow: ellipsis;
	overflow: hidden;
	&:hover {
		text-decoration: underline;
	}
`;

const IrcChatUser = ({ user, showPreviewCard }) => {
	const { away, nick } = user;

	return (
		<>
			<UserWrapper>
				<StatusDot away={away} />
				<User onClick={(e) => showPreviewCard(e, nick)}>{nick}</User>
			</UserWrapper>
		</>
	);
};

export default IrcChatUser;

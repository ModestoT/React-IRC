import React from "react";
import styled from "styled-components";

import Button from "../Button.js";

const UserPreview = styled.div`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	width: 43%;
	height: 13%;
	background: black;
	border: 1px solid;
	position: fixed;
	margin: 10px;

	h4 {
		margin: 8px 15px;
		width: 75%;
	}

	@media (min-width: 1024px) {
		width: 9%;
		height: 10%;

		h4 {
			width: 71%;
		}
	}
`;

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

const PreviewClose = styled.span`
	cursor: pointer;
	margin: 6px 0;

	&:hover {
		transform: scale(1.4);
	}

	@media (min-width: 1024px) {
		margin: 2%;
	}
`;

const IrcChatUser = ({ user, currentUserSelected, setCurrentUserSelected }) => {
	const { away, nick } = user;

	return (
		<>
			{nick === currentUserSelected && (
				<UserPreview>
					<h4>{nick}</h4>
					<PreviewClose onClick={() => setCurrentUserSelected("")}>x</PreviewClose>
					<Button btnText="Message" />
				</UserPreview>
			)}
			<UserWrapper>
				<StatusDot away={away} />
				<User onClick={() => setCurrentUserSelected(nick)}>{nick}</User>
			</UserWrapper>
		</>
	);
};

export default IrcChatUser;
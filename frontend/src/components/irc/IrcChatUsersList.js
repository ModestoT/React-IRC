import React, { useState } from "react";
import styled from "styled-components";
import IrcChatUser from "./IrcChatUser";

const UsersList = styled.ul`
	position: absolute;
	width: 50%;
	height: 84.5%;
	background: ${(props) => props.theme.secondaryBg};
	transform: translate(${(props) => (props.showUsers ? "85%" : "190%")});
	transition: 0.5s ease-in-out;
	margin: 0;
	padding: 2%;
	overflow-x: hidden;
	z-index: 5;

	@media (min-width: 1024px) {
		right: 0;
		position: initial;
		width: 14%;
		height: 98%;
		padding: 0.5%;
	}
`;

const IrcChatUsersList = ({ userList, showUsers }) => {
	const [currentUserSelected, setCurrentUserSelected] = useState("");
	const [previewCoords, setPreviewCoords] = useState({});

	const showPreviewCard = (e, nick) => {
		setCurrentUserSelected(nick);
		setPreviewCoords({ x: e.clientX, y: e.clientY });
	};

	if (userList.length > 0) {
		return (
			<UsersList showUsers={showUsers}>
				{userList.map((user, index) => {
					return (
						<IrcChatUser
							key={index}
							user={user}
							currentUserSelected={currentUserSelected}
							showPreviewCard={showPreviewCard}
							setCurrentUserSelected={setCurrentUserSelected}
							previewCoords={previewCoords}
						/>
					);
				})}
			</UsersList>
		);
	}
	return null;
};

export default IrcChatUsersList;

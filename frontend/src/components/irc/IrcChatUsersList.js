import React, { useState } from "react";
import styled from "styled-components";
import IrcChatUser from "./IrcChatUser";
import Button from "../Button.js";

const UsersList = styled.ul`
	position: absolute;
	width: 50%;
	height: 84.5%;
	background: ${(props) => props.theme.secondaryBg};
	transform: translate(${(props) => (props.showUsers ? "85%" : "185%")});
	transition: 0.4s ease-in-out;
	margin: 0;
	padding: 2%;
	overflow-x: hidden;
	z-index: 5;

	@media (min-width: 1024px) {
		transform: translate(0);
		position: initial;
		width: 14%;
		height: 98%;
		padding: 0.5%;
	}
`;

const UserPreview = styled.div`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	width: 55%;
	height: 15%;
	background: black;
	border: 1px solid;
	position: absolute;
	margin: 10px;
	left: 40%;
	top: calc(${(props) => props.yCoord}px - 50px);
	z-index: 10;

	h4 {
		margin: 8px 15px;
		width: 75%;
	}

	@media (min-width: 1024px) {
		width: 15%;
		height: 10%;
		left: 82%;
		top: calc(${(props) => props.yCoord}px + 10px);

		h4 {
			width: 82%;
		}
	}
`;

const PreviewClose = styled.span`
	cursor: pointer;
	margin: 6px 0;

	&:hover {
		transform: scale(1.4);
	}

	@media (min-width: 1024px) {
		margin-top: 2%;
	}
`;

const IrcChatUsersList = ({ userList, showUsers, windowWidthSize }) => {
	const [currentUserSelected, setCurrentUserSelected] = useState("");
	const [previewCoords, setPreviewCoords] = useState({});

	const showPreviewCard = (e, nick) => {
		setCurrentUserSelected(nick);
		setPreviewCoords({ x: e.clientX, y: e.clientY });
	};

	if (userList.length > 0) {
		return (
			<>
				<UsersList showUsers={showUsers}>
					{userList.map((user, index) => {
						return <IrcChatUser key={index} user={user} showPreviewCard={showPreviewCard} />;
					})}
				</UsersList>
				{currentUserSelected !== "" && (
					<UserPreview yCoord={previewCoords.y}>
						<h4>{currentUserSelected}</h4>
						<PreviewClose onClick={() => setCurrentUserSelected("")}>x</PreviewClose>
						<Button btnText="Message" />
					</UserPreview>
				)}
			</>
		);
	}
	return null;
};

export default IrcChatUsersList;

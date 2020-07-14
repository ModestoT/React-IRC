import React from "react";
import styled from "styled-components";
import IrcChatUser from "./IrcChatUser";

const UsersList = styled.ul`
	position: absolute;
	height: 87%;
	background: ${(props) => props.theme.secondaryBg};
	right: ${(props) => (props.showUsers ? "0" : "-100%")};
	z-index: 5;
	transition: right 0.5s;
	margin: 0;
	overflow-x: hidden;

	@media (min-width: 1024px) {
		right: 0;
		position: initial;
		height: 100%;
		background: inherit;
	}
`;

const IrcChatUsersList = ({ userList, showUsers }) => {
	if (userList.length > 0) {
		return (
			<UsersList showUsers={showUsers}>
				{userList.map((user, index) => {
					return <IrcChatUser key={index} user={user} />;
				})}
			</UsersList>
		);
	}
	return null;
};

export default IrcChatUsersList;

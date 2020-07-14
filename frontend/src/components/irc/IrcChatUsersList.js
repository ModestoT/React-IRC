import React from "react";
import styled from "styled-components";

const UsersList = styled.ul`
	position: absolute;
	height: 87%;
	background: ${(props) => props.theme.secondaryBg};
	right: ${(props) => (props.showUsers ? "0" : "-100%")};
	z-index: 5;
	transition: right 0.5s;
	margin: 0;
	overflow: auto;
`;

const IrcChatUsersList = ({ userList, showUsers }) => {
	if (userList.length > 0) {
		return (
			<UsersList showUsers={showUsers}>
				{userList.map((user) => {
					return <li key={user.nick}>{user.nick}</li>;
				})}
			</UsersList>
		);
	}
	return null;
};

export default IrcChatUsersList;

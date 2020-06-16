import React from "react";
import styled from "styled-components";

const IrcChatUsersList = ({ userList }) => {
	if (userList.length > 0) {
		return (
			<ul className="irc-chat-user-list" style={{ overflow: "auto" }}>
				{userList.map((user) => {
					return <li key={user.nick}>{user.nick}</li>;
				})}
			</ul>
		);
	}
	return null;
};

export default IrcChatUsersList;

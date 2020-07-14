import React, { useState } from "react";
import styled from "styled-components";

const UserPreview = styled.div`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	width: 50%;
	height: 15%;
	background: black;
	border: 1px solid;
	position: fixed;
	margin: 10px;
`;

const UserStatus = styled.div`
	display: flex;
	width: 80%;
	margin: 5px;
	align-items: center;
	p {
		margin: 0;
	}
`;

const StatusDot = styled.span`
	height: 15px;
	width: 15px;
	background-color: ${(props) => (props.away ? "red" : "green")};
	border-radius: 50%;
`;

const User = styled.li`
	cursor: pointer;
	text-overflow: ellipsis;
	overflow: hidden;
	&:hover {
		text-decoration: underline;
	}
`;

const IrcChatUser = ({ user }) => {
	const { away, nick } = user;
	const [showPreview, setShowPreview] = useState(false);

	return (
		<>
			{showPreview && (
				<UserPreview>
					<UserStatus>
						<StatusDot away={away} />
						<p>{away ? "Away" : "Online"}</p>
					</UserStatus>
					<span onClick={() => setShowPreview(false)}>x</span>
					<h4>{nick}</h4>
				</UserPreview>
			)}
			<User onClick={() => setShowPreview(!showPreview)}>{nick}</User>
		</>
	);
};

export default IrcChatUser;

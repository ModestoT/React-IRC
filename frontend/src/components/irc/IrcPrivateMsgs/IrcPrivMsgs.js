import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useFormInput } from "../../../customHooks/useFormInput.js";
import IrcPrivMsgConvo from "./IrcPrivMsgConvo.js";
import IrcPrivMsgPreview from "./IrcPrivMsgPreview.js";

const IrcPrivMsgsWrapper = styled.div`
	position: absolute;
	width: 45%;
	height: 40%;
	background: ${(props) => props.theme.mainBg};
	border: 1px solid ${(props) => props.theme.inputBg};
	border-radius: 3px;
	right: 1%;
	bottom: 4%;

	@media (min-width: 1024px) {
		width: 20%;
	}
`;

const PMHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${(props) => props.theme.inputBg};
	border: 1px solid grey;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;
	height: 11%;
`;

const DeselectUser = styled.span`
	cursor: pointer;
	font-size: 1.5rem;
	margin: 5px 10px 8px 5px;

	@media (min-width: 1024px) {
		margin: 5px 80px 8px 5px;
	}
`;

const UserHeader = styled.h3`
	margin: 0 39% 0 23%;

	@media (min-width: 1024px) {
		margin: 0 43% 0 14%;
	}
`;

const IrcPrivMsgs = ({ privateMsgs, updateReadMessages, sendPrivMsg }) => {
	const [userSelected, setUserSelected] = useState(null);
	const [privMsg, setPrivMsg] = useFormInput("");

	useEffect(() => {
		if (userSelected !== null) {
			const userSelectedMsgs = privateMsgs.find(
				(msg) => msg.user.toLowerCase() === userSelected.user.toLowerCase()
			);
			if (userSelected.messages.length !== userSelectedMsgs.messages.length) {
				console.log("updating messages");
				setUserSelected(userSelectedMsgs);
				updateReadMessages(userSelectedMsgs.user, userSelectedMsgs.unReadMessages);
			}
		}
	}, [userSelected, privateMsgs, updateReadMessages]);

	const handleSelectUser = (privMsg) => {
		setUserSelected(privMsg);
		updateReadMessages(privMsg.user, privMsg.unReadMessages);
	};

	const handleDeselectUser = () => {
		setUserSelected(null);
	};

	const handleSendPrivMsg = (e) => {
		e.preventDefault();
		sendPrivMsg({ target: userSelected.user, message: privMsg });
		setPrivMsg("");
	};

	return (
		<IrcPrivMsgsWrapper>
			<PMHeader>
				{userSelected === null ? (
					<h3>Private Messages</h3>
				) : (
					<>
						<DeselectUser onClick={() => handleDeselectUser()}>{"<"}</DeselectUser>
						<UserHeader>{userSelected.user}</UserHeader>
					</>
				)}
			</PMHeader>
			{userSelected === null
				? privateMsgs.map((privMsg) => {
						return (
							<IrcPrivMsgPreview
								key={privMsg.user}
								privMsg={privMsg}
								handleSelectUser={handleSelectUser}
							/>
						);
				  })
				: userSelected.messages.map((msg, index) => {
						return <IrcPrivMsgConvo key={index} message={msg} />;
				  })}
			{userSelected !== null && (
				<form onSubmit={(e) => handleSendPrivMsg(e)}>
					<input
						type="text"
						value={privMsg}
						onChange={(e) => setPrivMsg(e.target.value)}
						placeholder={`Message ${userSelected.user}`}
					/>
				</form>
			)}
		</IrcPrivMsgsWrapper>
	);
};

export default IrcPrivMsgs;

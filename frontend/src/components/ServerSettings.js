import React, { useEffect } from "react";
import styled from "styled-components";

import { useFormInput } from "../customHooks/useFormInput.js";
import { UpdatePastServerInfo } from "../helpers/GeneralHelpers.js";
import InputField from "./InputField.js";

const DeleteServerBtn = styled.button`
	cursor: pointer;
	border: 1px solid transparent;
	background: indianred;
	color: white;
	padding: 4px 8px;

	&:hover {
		background: red;
		color: ${(props) => props.theme.mainText};
	}
`;

const ServerSettingsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2%;

	@media (min-width: 1024px) {
		padding: 1%;
	}
`;

const ServerSettings = ({ server, deleteServerFromStorage }) => {
	const { id } = server;

	const [serverInfo, setServerInfo] = useFormInput({ ...server });

	useEffect(() => {
		UpdatePastServerInfo(id, serverInfo);
	}, [serverInfo, id]);

	return (
		<ServerSettingsWrapper>
			<InputField
				id="ServerName"
				labelText="Server"
				type="text"
				value={serverInfo.host}
				onChange={(e) => setServerInfo({ host: e.target.value })}
			/>
			<InputField
				id="Nickname"
				labelText="Nickname"
				type="text"
				value={serverInfo.nick}
				onChange={(e) => setServerInfo({ nick: e.target.value })}
			/>
			<DeleteServerBtn onClick={() => deleteServerFromStorage(id)}>Delete</DeleteServerBtn>
		</ServerSettingsWrapper>
	);
};

export default ServerSettings;

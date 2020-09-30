import React, { useState } from "react";
import styled from "styled-components";

import { GrabServerName } from "../helpers/IrcHelpers.js";
import Button from "./Button.js";
import PastServerChannel from "./PastServerChannel.js";

const PastServerWrapper = styled.li`
	margin-bottom: 10%;
`;

const PastServerHeaderWrapper = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2%;
	background: ${(props) => props.theme.inputBg};

	button {
		cursor: pointer;
		border: 1px solid transparent;
		background: indianred;
		color: white;
		padding: 4px 8px;

		&:hover {
			background: red;
			color: ${(props) => props.theme.mainText};
		}
	}
`;

const PastServerHeader = styled.div`
	display: flex;
	align-items: center;
	width: 65%;

	.server-name {
		cursor: pointer;
	}

	h3 {
		padding-top: 1%;
	}

	span {
		font-size: 1.5rem;
		margin: 0 5%;
	}

	h2,
	h3 {
		margin: 0;
	}
`;

const ChannelsList = styled.ul`
	padding: 0 3%;
	margin: 2% 0;
	height: ${(props) => (props.isCollapsed ? "0" : "initial")};
	overflow: hidden;
`;

const ChannelsListHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
`;

const ConnectBtnWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: baseline;
	background: ${(props) => props.theme.tertiaryBg};

	.disconnect {
		cursor: pointer;
		border: 1px solid transparent;
		background: indianred;
		color: white;
		padding: 4px 8px;
		margin: 15px;

		&:hover {
			background: red;
			color: ${(props) => props.theme.mainText};
		}
`;

const AddChannelBtn = styled.button`
	cursor: pointer;
	margin: 2% 0;
	background: ${(props) => props.theme.btnBg};
	border: none;
	color: ${(props) => props.theme.btnText};
`;

const PastServer = ({
	server,
	connectToIrc,
	currentServer,
	deleteChannelFromPastServers,
	currentChannel,
	setCurrentChannel,
	disconnectFromIrc,
	toggleModal,
	currentNick,
	setShowServerModal,
}) => {
	// Add ability to collapse past server
	const [isEditingChannels, setIsEditingChannels] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const { host, channels, id, nick } = server;

	const isConnected = () => {
		if (
			currentServer.length > 0 &&
			host.includes(currentServer) &&
			nick.toLowerCase() === currentNick.toLowerCase()
		) {
			return true;
		}

		return false;
	};
	return (
		<PastServerWrapper>
			<PastServerHeaderWrapper>
				<PastServerHeader onClick={() => setShowServerModal(server)}>
					<h2 className="server-name" onClick={() => setCurrentChannel(GrabServerName(host))}>
						{GrabServerName(host)}
					</h2>
				</PastServerHeader>
				<button onClick={() => setIsCollapsed(!isCollapsed)}>-</button>
			</PastServerHeaderWrapper>
			{!isConnected() ? (
				<ConnectBtnWrapper>
					<p>Not connected.</p>
					<Button onClick={(e) => connectToIrc(e, server)} btnText="connect" />
				</ConnectBtnWrapper>
			) : (
				<ConnectBtnWrapper>
					<p>Connected</p>
					<button className="disconnect" onClick={() => disconnectFromIrc()}>
						Disconnect
					</button>
				</ConnectBtnWrapper>
			)}
			<ChannelsList isCollapsed={isCollapsed}>
				<ChannelsListHeader>
					<h4>Channels</h4>
					{isEditingChannels ? (
						<Button onClick={() => setIsEditingChannels(!isEditingChannels)} btnText="done" />
					) : (
						<Button onClick={() => setIsEditingChannels(!isEditingChannels)} btnText="edit" />
					)}
				</ChannelsListHeader>
				{channels.map((channel, index) => (
					<PastServerChannel
						key={index}
						channel={channel}
						serverId={id}
						deleteChannelFromPastServers={deleteChannelFromPastServers}
						isEditing={isEditingChannels}
						currentChannel={currentChannel}
						setCurrentChannel={setCurrentChannel}
					/>
				))}
				{isConnected() && <AddChannelBtn onClick={() => toggleModal()}>+</AddChannelBtn>}
			</ChannelsList>
		</PastServerWrapper>
	);
};

export default PastServer;

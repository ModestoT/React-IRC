import React, { useState } from "react";
import styled from "styled-components";

import { GrabServerName } from "../helpers/IrcHelpers.js";
import Button from "./Button.js";
import PastServerChannel from "./PastServerChannel.js";

const PastServerWrapper = styled.li`
	margin-bottom: 10%;
`;

const PastServerHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 3%;
	background: ${(props) => props.theme.inputBg};

	h2 {
		cursor: pointer;
		margin: 0;
	}

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

const ChannelsList = styled.ul`
	padding: 0 3%;
	margin: 2% 0;
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

const PastServer = ({
	server,
	connectToIrc,
	currentServer,
	deleteServer,
	deleteChannelFromPastServers,
	currentChannel,
	setCurrentChannel,
	disconnectFromIrc,
}) => {
	const [isEditingChannels, setIsEditingChannels] = useState(false);
	const { host, channels, id } = server;
	const isConnected = currentServer.length > 0 ? host.includes(currentServer) : false;
	return (
		<PastServerWrapper>
			<PastServerHeader>
				<h2 onClick={() => setCurrentChannel(GrabServerName(host))}>{GrabServerName(host)}</h2>
				<button onClick={() => deleteServer(server.id)}>Delete</button>
			</PastServerHeader>
			{!isConnected ? (
				<ConnectBtnWrapper>
					<p>Not connected.</p>
					<Button onClick={(e) => connectToIrc(e, server, false)} btnText="connect" />
				</ConnectBtnWrapper>
			) : (
				<ConnectBtnWrapper>
					<p>Connected</p>
					<button className="disconnect" onClick={() => disconnectFromIrc()}>
						Disconnect
					</button>
				</ConnectBtnWrapper>
			)}
			<ChannelsList>
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
			</ChannelsList>
		</PastServerWrapper>
	);
};

export default PastServer;

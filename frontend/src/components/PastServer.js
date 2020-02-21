import React, { useState } from "react";
import styled from "styled-components";

import { GrabServerName } from "../helpers/IrcHelpers.js";
import Button from "./Button.js";
import PastServerChannel from "./PastServerChannel.js";

const PastServerHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 3%;
	background: ${props => props.theme.inputBg};

	h2 {
		margin: 0;
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
	background: ${props => props.theme.mainBg};
`;

const PastServer = ({
	server,
	connectToIrc,
	currentServer,
	deleteServer,
	deleteChannelFromPastServers
}) => {
	const [isEditingChannels, setIsEditingChannels] = useState(false);
	const { host, channels, id } = server;
	const isConnected = currentServer.length > 0 ? host.includes(currentServer) : false;
	return (
		<li>
			<PastServerHeader>
				<h2>{GrabServerName(host)}</h2>
				<button onClick={() => deleteServer(server.id)}>delete</button>
			</PastServerHeader>
			{!isConnected && (
				<ConnectBtnWrapper>
					<p>Not connected.</p>
					<Button onClick={e => connectToIrc(e, server, false)} btnText="connect" />
				</ConnectBtnWrapper>
			)}
			<ChannelsList>
				<ChannelsListHeader>
					<h4>Channels</h4>
					<button onClick={() => setIsEditingChannels(!isEditingChannels)}>edit</button>
				</ChannelsListHeader>
				{channels.map((channel, index) => (
					<PastServerChannel
						key={index}
						channel={channel}
						serverId={id}
						deleteChannelFromPastServers={deleteChannelFromPastServers}
						isEditing={isEditingChannels}
					/>
				))}
			</ChannelsList>
		</li>
	);
};

export default PastServer;

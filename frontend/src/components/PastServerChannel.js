import React from "react";
import styled from "styled-components";

const ChannelWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	border-bottom: 1px solid ${(props) => props.theme.inputBg};

	button {
		cursor: pointer;
		background: indianred;
		color: ${(props) => props.theme.mainText};
		border: none;
		border-radius: 3px;
		padding: 1% 3%;

		&:hover {
			background: red;
			color: white;
		}
	}
`;

const Channel = styled.p`
	cursor: pointer;
	margin: 2% 0;
	text-decoration: ${(props) =>
		props.currentChannel === props.channel && props.isConnected() ? "underline" : "none"};
`;

const PastServerChannel = ({
	channel,
	serverId,
	deleteChannelFromPastServers,
	isEditing,
	currentChannel,
	setCurrentChannel,
	isConnected,
}) => {
	return (
		<ChannelWrapper>
			<Channel
				onClick={() => setCurrentChannel(channel)}
				channel={channel}
				currentChannel={currentChannel}
				isConnected={isConnected}
			>
				{channel}
			</Channel>
			{isEditing && (
				<button onClick={() => deleteChannelFromPastServers(channel, serverId)}>X</button>
			)}
		</ChannelWrapper>
	);
};

export default PastServerChannel;

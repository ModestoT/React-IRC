import React from "react";
import styled from "styled-components";

const ChannelWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	border-bottom: 1px solid ${props => props.theme.inputBg};
	cursor: pointer;

	&:hover {
		p {
			text-decoration: underline;
		}
	}
`;

const PastServerChannel = ({ channel, serverId, deleteChannelFromPastServers, isEditing }) => {
	return (
		<ChannelWrapper>
			<p>{channel}</p>
			{isEditing && (
				<button onClick={() => deleteChannelFromPastServers(channel, serverId)}>X</button>
			)}
		</ChannelWrapper>
	);
};

export default PastServerChannel;

import React from "react";
import styled from "styled-components";

const ChannelWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	border-bottom: 1px solid ${props => props.theme.inputBg};

	p {
		margin: 2% 0;
	}

	button {
		cursor: pointer;
		background: indianred;
		color: ${props => props.theme.mainText};
		border: none;
		border-radius: 3px;
		padding: 1% 3%;

		&:hover {
			background: red;
			color: white;
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

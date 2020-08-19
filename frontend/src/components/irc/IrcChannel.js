import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const TableRow = styled.tr`
	display: flex;
	align-items: center;
	width: 100%;
	margin: 5px 0;
`;

const ChannelNumUsers = styled.td`
	display: flex;
	width: 16%;
	justify-content: space-evenly;

	@media (min-width: 1024px) {
		width: 5%;
	}
`;

const ChannelName = styled.td`
	width: 29%;
	@media (min-width: 1024px) {
		width: 12%;
	}
`;

const ChannelTopic = styled.td`
	cursor: pointer;
	width: 40%;
	height: 50px;
	overflow: hidden;
	text-overflow: ellipsis;

	@media (min-width: 1024px) {
		width: 79%;
	}
`;

const IrcChannel = ({ joinableChannel, joinIrcChannel, toggleModal }) => {
	const { channel, topic, num_users } = joinableChannel;

	const handleChannelJoin = () => {
		joinIrcChannel(channel);
		toggleModal();
	};

	return (
		<TableRow>
			<ChannelNumUsers>
				<FontAwesomeIcon icon={faUsers} />
				{num_users}
			</ChannelNumUsers>
			<ChannelName>{channel}</ChannelName>
			{/* Add ability to expand the topic on click to view all the text */}
			<ChannelTopic>{topic}</ChannelTopic>
			<td>
				<button onClick={() => handleChannelJoin()}>JOIN</button>
			</td>
		</TableRow>
	);
};

export default IrcChannel;

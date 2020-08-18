import React from "react";
import styled from "styled-components";

import IrcChannel from "./IrcChannel";

const Table = styled.table`
	display: flex;

	tbody {
		width: 100%;
	}
`;

const IrcChannelsTable = ({ channels, currentPage, joinIrcChannel, toggleModal }) => {
	return (
		<Table>
			<tbody>
				{channels[currentPage].map((channel) => {
					return (
						<IrcChannel
							key={channel.channel}
							joinableChannel={channel}
							joinIrcChannel={joinIrcChannel}
							toggleModal={toggleModal}
						/>
					);
				})}
			</tbody>
		</Table>
	);
};

export default IrcChannelsTable;

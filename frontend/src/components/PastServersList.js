import React from "react";
import styled from "styled-components";

import PastServer from "./PastServer.js";

const PastServersListWrapper = styled.ul`
	list-style-type: none;
	padding: 0;

	h1 {
		text-align: center;
	}
`;

const PastServersList = ({
	connectToIrc,
	currentServer,
	pastServers,
	deleteServer,
	deleteChannelFromPastServers
}) => {
	return (
		<PastServersListWrapper>
			<h1>Saved Servers</h1>
			{pastServers.length > 0 ? (
				pastServers.map(server => (
					<PastServer
						key={server.id}
						server={server}
						connectToIrc={connectToIrc}
						currentServer={currentServer}
						deleteServer={deleteServer}
						deleteChannelFromPastServers={deleteChannelFromPastServers}
					/>
				))
			) : (
				<h4>No Saved Servers yet</h4>
			)}
		</PastServersListWrapper>
	);
};

export default PastServersList;

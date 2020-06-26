import React from "react";
import styled from "styled-components";

import PastServer from "./PastServer.js";

const PastServersListWrapper = styled.ul`
	list-style-type: none;
	padding: 0;
	overflow: auto;

	h1,
	h4 {
		text-align: center;
	}
`;

const PastServersList = ({
	connectToIrc,
	currentServer,
	pastServers,
	deleteServer,
	deleteChannelFromPastServers,
	currentChannel,
	setCurrentChannel,
	disconnectFromIrc,
	toggleModal,
}) => {
	return (
		<PastServersListWrapper>
			<h1>Saved Servers</h1>
			{pastServers.length > 0 ? (
				pastServers.map((server) => (
					<PastServer
						key={server.id}
						server={server}
						connectToIrc={connectToIrc}
						currentServer={currentServer}
						deleteServer={deleteServer}
						deleteChannelFromPastServers={deleteChannelFromPastServers}
						currentChannel={currentChannel}
						setCurrentChannel={setCurrentChannel}
						disconnectFromIrc={disconnectFromIrc}
						toggleModal={toggleModal}
					/>
				))
			) : (
				<h4>No Saved Servers yet</h4>
			)}
		</PastServersListWrapper>
	);
};

export default PastServersList;

import React from "react";
import styled from "styled-components";

import PastServer from "./PastServer.js";

const PastServerListWrapper = styled.div`
	height: 89%;
	overflow: auto;
`;

const PastServersUL = styled.ul`
	list-style-type: none;
	padding: 0;

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
	currentNick,
	setShowServerModal,
}) => {
	return (
		<>
			<h1>Saved Servers</h1>
			{pastServers.length > 0 ? (
				<PastServerListWrapper>
					<PastServersUL>
						{pastServers.map((server) => (
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
								currentNick={currentNick}
								setShowServerModal={setShowServerModal}
							/>
						))}
					</PastServersUL>
				</PastServerListWrapper>
			) : (
				<h4>No Saved Servers yet</h4>
			)}
		</>
	);
};

export default PastServersList;

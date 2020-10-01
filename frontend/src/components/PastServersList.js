import React from "react";
import styled from "styled-components";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import PastServer from "./PastServer.js";

const PastServerListWrapper = styled.div`
	height: 85%;

	@media (min-width: 1024px) {
		height: 93%;
	}
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
					<SimpleBar style={{ height: "100%" }}>
						<PastServersUL>
							{pastServers.map((server) => (
								<PastServer
									key={server.id}
									server={server}
									connectToIrc={connectToIrc}
									currentServer={currentServer}
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
					</SimpleBar>
				</PastServerListWrapper>
			) : (
				<h4>No Saved Servers yet</h4>
			)}
		</>
	);
};

export default PastServersList;

import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Button from "../components/Button.js";
import PastServersList from "../components/PastServersList.js";
import { GrabServerName } from "../helpers/IrcHelpers.js";

const AppHeader = styled.header`
	width: 100%;
	display: flex;
	align-items: center;
	background: ${(props) => props.theme.secondaryBg};
	border-bottom: 1px solid ${(props) => props.theme.inputBg};
	height: 9%;

	@media (min-width: 1024px) {
		height: 5%;
	}
`;

const AppContent = styled.div`
	display: flex;
	height: 91%;
	overflow: hidden;
	background: ${(props) => props.theme.mainBg};

	@media (min-width: 1024px) {
		height: 100%;
	}
`;

const ContentWrapper = styled.div`
	position: relative;
	width: 100%;
	left: ${(props) => (props.sideMenuOpen ? "80%" : "0")};
	transition: left 0.5s;
	${(props) =>
		props.sideMenuOpen &&
		`
      background-color: rgba(0,0,0,.4);
      opacity: .5;
		`}
`;

const MobileSideMenu = styled.div`
	position: absolute;
	width: 80%;
	height: calc(91% - 1px);
	background: ${(props) => props.theme.secondaryBg};
	left: ${(props) => (props.sideMenuOpen ? "0" : "-100%")};
	z-index: 5;
	transition: left 0.5s;
`;

const DesktopSideMenu = styled.div`
	background: ${(props) => props.theme.secondaryBg};
	height: 100%;
	width: 15%;
`;

const HeaderAndSideMenuView = ({
	children,
	connectToIrc,
	currentServer,
	pastServers,
	deleteServer,
	deleteChannelFromPastServers,
	windowWidthSize,
	currentChannel,
	setCurrentChannel,
	disconnectFromIrc,
}) => {
	const [sideMenuOpen, setSideMenuOpen] = useState(false);

	useEffect(() => {
		if (windowWidthSize > 1024) setSideMenuOpen(false);
	}, [windowWidthSize]);

	const setCurrentChannelMobile = (channel) => {
		setCurrentChannel(channel);
		setSideMenuOpen(!sideMenuOpen);
	};

	const connectToPastServerMobile = (e, server) => {
		connectToIrc(e, server, false);
		setSideMenuOpen(!sideMenuOpen);
		setCurrentChannel(GrabServerName(server.host));
	};

	const connectToPastServer = (e, server) => {
		connectToIrc(e, server, false);
		setCurrentChannel(GrabServerName(server.host));
	};

	return (
		<>
			<AppHeader>
				{windowWidthSize < 1024 && (
					<Button onClick={() => setSideMenuOpen(!sideMenuOpen)} btnText="Servers" />
				)}
			</AppHeader>
			<AppContent>
				{windowWidthSize < 1024 ? (
					<MobileSideMenu sideMenuOpen={sideMenuOpen}>
						<PastServersList
							connectToIrc={connectToPastServerMobile}
							currentServer={currentServer}
							pastServers={pastServers}
							deleteServer={deleteServer}
							deleteChannelFromPastServers={deleteChannelFromPastServers}
							currentChannel={currentChannel}
							setCurrentChannel={setCurrentChannelMobile}
							disconnectFromIrc={disconnectFromIrc}
						/>
					</MobileSideMenu>
				) : (
					<DesktopSideMenu>
						<PastServersList
							connectToIrc={connectToPastServer}
							currentServer={currentServer}
							pastServers={pastServers}
							deleteServer={deleteServer}
							deleteChannelFromPastServers={deleteChannelFromPastServers}
							currentChannel={currentChannel}
							setCurrentChannel={setCurrentChannel}
							disconnectFromIrc={disconnectFromIrc}
						/>
					</DesktopSideMenu>
				)}
				<ContentWrapper sideMenuOpen={sideMenuOpen}>{children}</ContentWrapper>
			</AppContent>
		</>
	);
};

export default HeaderAndSideMenuView;

import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Button from "./Button.js";
import Modal from "./Modal";
import IrcJoinableChannels from "./irc/IrcChannel/IrcJoinableChannels";
import PastServersList from "./PastServersList.js";
import ServerSettings from "./ServerSettings.js";

const AppHeader = styled.header`
	width: 100%;
	display: flex;
	align-items: center;
	background: ${(props) => props.theme.secondaryBg};
	border-bottom: 1px solid ${(props) => props.theme.inputBg};
	height: 7%;

	@media (min-width: 1024px) {
		display: none;
	}
`;

const AppContent = styled.div`
	display: flex;
	height: 100%;
	overflow: hidden;
	background: ${(props) => props.theme.mainBg};
`;

const ContentWrapper = styled.div`
	position: relative;
	width: 100%;
	transform: translate(${(props) => (props.sideMenuOpen ? "80%" : "0")});
	transition: 0.5s ease-in-out;
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
	height: calc(93% - 1px);
	background: ${(props) => props.theme.secondaryBg};
	transform: translate(${(props) => (props.sideMenuOpen ? "0" : "-100%")});
	transition: 0.5s ease-in-out;
	z-index: 5;

	h1 {
		text-align: center;
	}
`;

const DesktopSideMenu = styled.div`
	background: ${(props) => props.theme.secondaryBg};
	height: 100%;
	width: 17%;

	h1 {
		text-align: center;
	}
`;

const HeaderAndSideMenuView = ({
	children,
	state,
	connectToIrc,
	deleteServer,
	deleteChannelFromPastServers,
	windowWidthSize,
	currentChannel,
	setCurrentChannel,
	disconnectFromIrc,
	grabAvailableChannels,
	joinIrcChannel,
}) => {
	const { serverName, pastServers, joinableChannels, isGrabbingChannels, nick } = state;

	const [sideMenuOpen, setSideMenuOpen] = useState(false);
	const [showServerModal, setShowServerModal] = useState(false);
	const [isToggled, setIsToggled] = useState(false);
	const [currentServerSelected, setCurrentServerSelected] = useState({});

	useEffect(() => {
		if (windowWidthSize > 1024) setSideMenuOpen(false);
	}, [windowWidthSize]);

	const toggleModal = () => {
		if (joinableChannels.pages === 0) {
			grabAvailableChannels();
		}

		if (windowWidthSize < 1024) {
			setSideMenuOpen(!sideMenuOpen);
		}

		setIsToggled(!isToggled);
	};

	const handleJoinIrcChannel = (channel) => {
		joinIrcChannel(channel);
		setCurrentChannel(channel);
	};

	const setCurrentChannelMobile = (channel) => {
		setCurrentChannel(channel);
		setSideMenuOpen(!sideMenuOpen);
	};

	const connectToPastServerMobile = (e, server) => {
		connectToIrc(e, server, true);
		setSideMenuOpen(!sideMenuOpen);
	};

	const connectToPastServer = (e, server) => {
		connectToIrc(e, server, true);
	};

	const openServerSettings = (server) => {
		setCurrentServerSelected(server);
		setShowServerModal(true);
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
							currentServer={serverName}
							pastServers={pastServers}
							deleteServer={deleteServer}
							deleteChannelFromPastServers={deleteChannelFromPastServers}
							currentChannel={currentChannel}
							setCurrentChannel={setCurrentChannelMobile}
							disconnectFromIrc={disconnectFromIrc}
							toggleModal={toggleModal}
							currentNick={nick}
							setShowServerModal={openServerSettings}
						/>
					</MobileSideMenu>
				) : (
					<DesktopSideMenu>
						<PastServersList
							connectToIrc={connectToPastServer}
							currentServer={serverName}
							pastServers={pastServers}
							deleteServer={deleteServer}
							deleteChannelFromPastServers={deleteChannelFromPastServers}
							currentChannel={currentChannel}
							setCurrentChannel={setCurrentChannel}
							disconnectFromIrc={disconnectFromIrc}
							toggleModal={toggleModal}
							currentNick={nick}
							setShowServerModal={openServerSettings}
						/>
					</DesktopSideMenu>
				)}
				<ContentWrapper sideMenuOpen={sideMenuOpen}>{children}</ContentWrapper>

				<Modal showModal={isToggled} toggleModal={setIsToggled} headerVal="Channels">
					<IrcJoinableChannels
						joinableChannels={state.joinableChannels}
						joinIrcChannel={handleJoinIrcChannel}
						isGrabbingChannels={isGrabbingChannels}
					/>
				</Modal>
				<Modal
					showModal={showServerModal}
					toggleModal={setShowServerModal}
					headerVal="Server Settings"
				>
					<ServerSettings server={currentServerSelected} deleteServer={deleteServer} />
				</Modal>
			</AppContent>
		</>
	);
};

export default HeaderAndSideMenuView;

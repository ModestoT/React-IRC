import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Button from "../components/Button.js";
import PastServersList from "../components/PastServersList.js";

const AppHeader = styled.header`
	width: 100%;
	display: flex;
	align-items: center;
	background: ${props => props.theme.secondaryBg};
	border-bottom: 1px solid ${props => props.theme.inputBg};
	height: 9%;

	@media (min-width: 1024px) {
		height: 5%;
	}
`;

const AppContent = styled.div`
	display: flex;
	height: 91%;
	overflow: hidden;
	background: ${props => props.theme.mainBg};

	@media (min-width: 1024px) {
		height: 100%;
	}
`;

const ContentWrapper = styled.div`
	width: 100%;
	left: ${props => (props.sideMenuOpen ? "80%" : "0")};
	${props =>
		props.sideMenuOpen &&
		`
      position: relative;
      background-color: rgba(0,0,0,.4);
      opacity: .5;
    `}
`;

const MobileSideMenu = styled.div`
	position: absolute;
	width: 80%;
	height: calc(91% - 1px);
	background: ${props => props.theme.secondaryBg};
	left: ${props => (props.sideMenuOpen ? "0" : "-100%")};
	z-index: 5;
`;

const DesktopSideMenu = styled.div`
	background: ${props => props.theme.secondaryBg};
	height: 100%;
	width: 15%;
`;

const HeaderAndSideMenuView = ({
	children,
	connectToIrc,
	currentServer,
	pastServers,
	deleteServer,
	deleteChannelFromPastServers
}) => {
	const [sideMenuOpen, setSideMenuOpen] = useState(false);
	const [windowWidthSize, setwindowWidthSize] = useState(window.innerWidth);

	useEffect(() => {
		const updateWidth = () => {
			setwindowWidthSize(window.innerWidth);

			if (window.innerWidth > 1024) setSideMenuOpen(false);
		};
		window.addEventListener("resize", updateWidth);

		return () => window.removeEventListener("resize", updateWidth);
	}, []);

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
							connectToIrc={connectToIrc}
							currentServer={currentServer}
							pastServers={pastServers}
							deleteServer={deleteServer}
							deleteChannelFromPastServers={deleteChannelFromPastServers}
						/>
					</MobileSideMenu>
				) : (
					<DesktopSideMenu>
						<PastServersList
							connectToIrc={connectToIrc}
							currentServer={currentServer}
							pastServers={pastServers}
							deleteServer={deleteServer}
							deleteChannelFromPastServers={deleteChannelFromPastServers}
						/>
					</DesktopSideMenu>
				)}
				<ContentWrapper sideMenuOpen={sideMenuOpen}>{children}</ContentWrapper>
			</AppContent>
		</>
	);
};

export default HeaderAndSideMenuView;

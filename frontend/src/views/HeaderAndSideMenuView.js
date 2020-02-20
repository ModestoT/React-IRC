import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Button from "../components/Button.js";
import PastConfigsList from "../components/PastConfigsList.js";

const AppHeader = styled.header`
	width: 100%;
	display: flex;
	align-items: center;
	background: ${props => props.theme.mainBg};
	border-bottom: 1px solid ${props => props.theme.inputBg};
`;

const AppContent = styled.div`
	display: flex;
	height: 91%;
	overflow: hidden;
	background: ${props => props.theme.mainBg};
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
	height: 91%;
	background: ${props => props.theme.secondaryBg};
	left: ${props => (props.sideMenuOpen ? "0" : "-100%")};
	z-index: 5;
`;

const DesktopSideMenu = styled.div``;

const HeaderAndSideMenuView = ({
	children,
	connectToIrc,
	currentServer,
	pastConfigs,
	deleteConfig
}) => {
	const [sideMenuOpen, setSideMenuOpen] = useState(false);
	const [windowWidthSize, setwindowWidthSize] = useState(window.innerWidth);

	useEffect(() => {
		const updateWidth = () => {
			setwindowWidthSize(window.innerWidth);
		};
		window.addEventListener("resize", updateWidth);

		return () => window.removeEventListener("resize", updateWidth);
	}, []);

	return (
		<>
			<AppHeader>
				<Button onClick={() => setSideMenuOpen(!sideMenuOpen)} btnText="Configs" />
			</AppHeader>
			<AppContent>
				{windowWidthSize < 1024 ? (
					<MobileSideMenu sideMenuOpen={sideMenuOpen}>
						<PastConfigsList
							connectToIrc={connectToIrc}
							currentServer={currentServer}
							pastConfigs={pastConfigs}
							deleteConfig={deleteConfig}
						/>
					</MobileSideMenu>
				) : (
					<DesktopSideMenu>
						<PastConfigsList
							connectToIrc={connectToIrc}
							currentServer={currentServer}
							pastConfigs={pastConfigs}
							deleteConfig={deleteConfig}
						/>
					</DesktopSideMenu>
				)}
				<ContentWrapper sideMenuOpen={sideMenuOpen}>{children}</ContentWrapper>
			</AppContent>
		</>
	);
};

export default HeaderAndSideMenuView;

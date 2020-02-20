import React, { useState, useEffect } from "react";
import styled from "styled-components";

import PastConfigsList from "../components/PastConfigsList.js";

const AppHeader = styled.header`
	width: 100%;
	display: flex;
	align-items: center;
`;

const AppContent = styled.div`
	display: flex;
	height: 91%;
`;

const ContentWrapper = styled.div`
	width: ${props => (props.sideMenuOpen ? "25%" : "100%")};

	${props =>
		props.sideMenuOpen &&
		`
      position:relative;
      left:25%;
    `}
`;

const MobileSideMenu = styled.div`
	display: ${props => (props.sideMenuOpen ? "block" : "none")};
	${props => props.sideMenuOpen && "width: 80%"}
`;

const SideMenuDisplayBtn = styled.button`
	border: none;
	padding: 1%;
	margin: 5%;
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
				<SideMenuDisplayBtn onClick={() => setSideMenuOpen(!sideMenuOpen)}>
					Configs
				</SideMenuDisplayBtn>
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

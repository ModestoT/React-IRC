import React, { useState, useEffect } from "react";
import styled from "styled-components";

import PastConfigsList from "../components/PastConfigsList.js";

const AppHeader = styled.header`
	width: 100%;
	display: flex;
	align-items: center;
`;

const MobileSideMenu = styled.div`
	display: ${props => (props.sideMenuOpen ? "block" : "none")};
`;

const SideMenuDisplayBtn = styled.button`
	border: none;
	padding: 1%;
	margin: 0 5%;
`;

const DesktopSideMenu = styled.div``;

const HeaderAndSideMenuView = ({ connectToIrc, currentServer, pastConfigs, deleteConfig }) => {
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
				<h2>New Config</h2>
			</AppHeader>
			<MobileSideMenu sideMenuOpen={sideMenuOpen}>
				<PastConfigsList
					connectToIrc={connectToIrc}
					currentServer={currentServer}
					pastConfigs={pastConfigs}
					deleteConfig={deleteConfig}
				/>
			</MobileSideMenu>
			{windowWidthSize > 1024 && (
				<DesktopSideMenu>
					<PastConfigsList
						connectToIrc={connectToIrc}
						currentServer={currentServer}
						pastConfigs={pastConfigs}
						deleteConfig={deleteConfig}
					/>
				</DesktopSideMenu>
			)}
		</>
	);
};

export default HeaderAndSideMenuView;

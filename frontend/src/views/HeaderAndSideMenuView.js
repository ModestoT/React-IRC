import React, { useState, useEffect } from "react";
import styled from "styled-components";

import PastConfigsList from "../components/PastConfigsList.js";

const MobileSideMenu = styled.div`
	display: ${props => (props.sideMenuOpen ? "block" : "none")};
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
			<header>
				<button onClick={() => setSideMenuOpen(!sideMenuOpen)}>Sidenav</button>
				<h1>Irc React App</h1>
			</header>
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

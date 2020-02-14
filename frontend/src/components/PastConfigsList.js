import React from "react";

import PastConfig from "./PastConfig";

const PastConfigsList = ({ connectToIrc, currentServer }) => {
	const pastConfigs = JSON.parse(localStorage.getItem("past_configs"));
	if (pastConfigs) {
		return (
			<ul>
				<h2>Past Configs</h2>
				{pastConfigs.map((config, index) => (
					<PastConfig
						key={index}
						config={config}
						connectToIrc={connectToIrc}
						currentServer={currentServer}
					/>
				))}
			</ul>
		);
	} else {
		return null;
	}
};

export default PastConfigsList;

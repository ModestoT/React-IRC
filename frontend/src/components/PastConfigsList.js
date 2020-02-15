import React from "react";

import PastConfig from "./PastConfig";

const PastConfigsList = ({ connectToIrc, currentServer, pastConfigs, deleteConfig }) => {
	if (pastConfigs.length > 0) {
		return (
			<ul>
				<h2>Past Configs</h2>
				{pastConfigs.map(config => (
					<PastConfig
						key={config.id}
						config={config}
						connectToIrc={connectToIrc}
						currentServer={currentServer}
						deleteConfig={deleteConfig}
					/>
				))}
			</ul>
		);
	} else {
		return null;
	}
};

export default PastConfigsList;

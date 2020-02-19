import React from "react";
import styled from "styled-components";

import PastConfig from "./PastConfig";

const PastConfigsListWrapper = styled.div`
	list-style-type: none;
	margin: 1% 0 0 2%;
	width: 13%;
`;

const PastConfigsList = ({ connectToIrc, currentServer, pastConfigs, deleteConfig }) => {
	return (
		<PastConfigsListWrapper>
			<h2>Past Configs</h2>
			{pastConfigs.length > 0 ? (
				pastConfigs.map(config => (
					<PastConfig
						key={config.id}
						config={config}
						connectToIrc={connectToIrc}
						currentServer={currentServer}
						deleteConfig={deleteConfig}
					/>
				))
			) : (
				<h4>No Saved configs yet</h4>
			)}
		</PastConfigsListWrapper>
	);
};

export default PastConfigsList;

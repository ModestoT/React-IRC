import React from "react";
import styled from "styled-components";

const ChangePageWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 1.3rem;

	.arrows {
		font-size: 2rem;
	}
`;

const ChangePageButtons = ({ handlePageBack, handlePageForward, currentPage, totalPages }) => {
	return (
		<ChangePageWrapper>
			<span className="arrows" onClick={() => handlePageBack()}>
				{"<"}
			</span>
			<span>
				{currentPage + 1}/{totalPages}
			</span>
			<span className="arrows" onClick={() => handlePageForward()}>
				{">"}
			</span>
		</ChangePageWrapper>
	);
};

export default ChangePageButtons;

import React from "react";
import styled from "styled-components";

const ChangePageWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ChangePageButtons = ({ handlePageBack, handlePageForward, currentPage, totalPages }) => {
	return (
		<ChangePageWrapper>
			<span onClick={() => handlePageBack()}>{"<"}</span>
			<span>
				{currentPage + 1}/{totalPages}
			</span>
			<span onClick={() => handlePageForward()}>{">"}</span>
		</ChangePageWrapper>
	);
};

export default ChangePageButtons;

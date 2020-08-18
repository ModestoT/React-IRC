import React from "react";
import styled from "styled-components";

const ChangePageButtons = ({ handlePageBack, handlePageForward, currentPage, totalPages }) => {
	return (
		<div>
			<span onClick={() => handlePageBack()}>{"<"}</span>
			<span>
				{currentPage + 1}/{totalPages}
			</span>
			<span onClick={() => handlePageForward()}>{">"}</span>
		</div>
	);
};

export default ChangePageButtons;

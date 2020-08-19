import React from "react";
import styled from "styled-components";

const ChangePageWrapper = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-size: 1.3rem;

	.arrows {
		cursor: pointer;
		font-size: 2rem;
	}

	.left-arrow {
		opacity: ${(props) => (props.currentPage === 0 ? "0" : "1")};
	}

	.right-arrow {
		opacity: ${(props) => (props.currentPage + 1 === props.totalPages ? "0" : "1")};
	}
`;

const ChangePageButtons = ({ handlePageBack, handlePageForward, currentPage, totalPages }) => {
	return (
		<ChangePageWrapper currentPage={currentPage} totalPages={totalPages}>
			<span className="left-arrow arrows" onClick={() => handlePageBack()}>
				{"<"}
			</span>
			<span>
				{currentPage + 1}/{totalPages}
			</span>
			<span className="right-arrow arrows" onClick={() => handlePageForward()}>
				{">"}
			</span>
		</ChangePageWrapper>
	);
};

export default ChangePageButtons;

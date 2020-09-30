import React from "react";
import styled from "styled-components";

const OverlayWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.4);
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	z-index: 100;
`;

const ModalWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 95%;
	height: 97vh;
	background-color: ${(props) => props.theme.mainBg};
	border-radius: 3px;
	overflow: auto;

	@media @labtop {
		width: 70%;
	}

	@media @tablet {
		width: 95%;
	}
`;

const ModalHeader = styled.header`
	display: flex;
	width: 100%;
	justify-content: space-between;
	border-bottom: 1px solid lightgrey;

	h2 {
		font-size: 2rem;
		margin-left: 5px;
	}

	.close-modal-btn {
		cursor: pointer;
		font-size: 2rem;
		background-color: inherit;
		border: none;
		color: ${(props) => props.theme.mainText};

		&:hover {
			transform: scale(1.5);
		}
	}

	@media (min-width: 1024px) {
		width: 99%;
		padding: 9px;
	}
`;

// showModal prop boolean value used to display contents within the modal component
// toggleModal function prop to change the showModal state
const Modal = ({ children, showModal, toggleModal, headerVal }) => {
	return (
		<>
			{showModal ? (
				<OverlayWrapper>
					<ModalWrapper id="modalWrapper-id">
						<ModalHeader>
							{headerVal ? <h2>{headerVal}</h2> : null}
							<button className="close-modal-btn" onClick={() => toggleModal()}>
								X
							</button>
						</ModalHeader>
						{React.Children.map(children, (child) => {
							return React.cloneElement(child, { ...child.props, toggleModal });
						})}
					</ModalWrapper>
				</OverlayWrapper>
			) : null}
		</>
	);
};

export default Modal;

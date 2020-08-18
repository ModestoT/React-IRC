import React, { useState } from "react";
import styled from "styled-components";

import { SearchChannelMatrix } from "../../helpers/IrcHelpers.js";
import IrcChannelsTable from "./IrcChannelsTable.js";
import ChangePageButtons from "../ChangePageButtons.js";

const ServerSearch = styled.input`
	input {
		width: 95%;
		background: ${(props) => props.theme.inputBg};
		color: ${(props) => props.theme.mainText};
		border-radius: 15px;
		border: none;
		padding: 1%;
		outline: none;

		@media (min-width: 1024px) {
			padding: 0.5%;
		}
	}
`;

const IrcJoinableChannels = ({
	joinableChannels,
	joinIrcChannel,
	isGrabbingChannels,
	toggleModal,
}) => {
	const { pages, channels } = joinableChannels;

	const [data, setData] = useState({
		currentPage: 0,
		searchRes: [],
		isSearching: false,
	});

	const sendSearchTerm = (searchTerm) => {
		if (searchTerm.length > 0) {
			setData({ ...data, isSearching: true, currentPage: 0 });

			const searchRes = SearchChannelMatrix(channels, searchTerm, 200);
			setData((d) => ({ ...d, searchRes, isSearching: false }));
		} else {
			setData((d) => ({ ...d, searchRes: [] }));
		}
	};

	const renderChannels = () => {
		const { searchRes, currentPage, isSearching } = data;
		if (isSearching) {
			return <p>Searching for channel...</p>;
		} else if (searchRes.length > 0 && !isSearching) {
			return (
				<IrcChannelsTable
					channels={searchRes}
					currentPage={currentPage}
					joinIrcChannel={joinIrcChannel}
					toggleModal={toggleModal}
				/>
			);
		} else if (pages > 0 || channels.length > 0) {
			return (
				<IrcChannelsTable
					channels={channels}
					currentPage={currentPage}
					joinIrcChannel={joinIrcChannel}
					toggleModal={toggleModal}
				/>
			);
		} else {
			return <p>No channels available</p>;
		}
	};

	const handlePageBack = () => {
		setData((d) => ({
			...d,
			currentPage: d.currentPage === 1 ? d.currentPage : d.currentPage - 1,
		}));
	};

	const handlePageForward = () => {
		setData((d) => ({
			...d,
			currentPage: d.currentPage === pages ? d.currentPage : d.currentPage + 1,
		}));
	};
	return (
		<>
			<ServerSearch
				type="text"
				disabled={isGrabbingChannels}
				onChange={(e) => sendSearchTerm(e.target.value)}
				aria-label="Search for a channel to join"
				placeholder="Search for a channel to join"
			/>
			<ChangePageButtons
				handlePageBack={handlePageBack}
				handlePageForward={handlePageForward}
				currentPage={data.currentPage}
				totalPages={pages}
			/>
			{isGrabbingChannels ? <span>Getting List of Channels...</span> : renderChannels()}
		</>
	);
};

export default IrcJoinableChannels;

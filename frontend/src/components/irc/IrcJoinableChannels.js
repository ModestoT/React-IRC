import React, { useState } from "react";

import { SearchMatrix } from "../../helpers/IrcHelpers.js";
import IrcChannelsTable from "./IrcChannelsTable.js";

const IrcJoinableChannels = ({ joinableChannels, joinIrcchannel, isGrabbingChannels }) => {
  const { pages, channels } = joinableChannels;

  const [data, setData] = useState({
    currentPage: 0,
    searchRes: [],
    isSearching: false
  });

  const sendSearchTerm = channelSearch => {
    if(channelSearch.length > 0){
      setData(({...data, isSearching: true, currentPage: 0 }));

      const searchRes = SearchMatrix(channels, channelSearch, 200);
      setData(d => ({...d, searchRes, isSearching: false}));

    } else {
      setData(d => ({...d, searchRes: [] }));
    }
  };

  const renderChannels = () => {
    const { searchRes, currentPage, isSearching } = data;
    if(isSearching){
      return <p>Searching for channel...</p>

    } else if(searchRes.length > 0 && !isSearching){
      return <IrcChannelsTable channels={searchRes} currentPage={currentPage} joinIrcchannel={joinIrcchannel}/>

    } else if(pages > 0 || channels.length > 0){
      return <IrcChannelsTable channels={channels} currentPage={currentPage} joinIrcchannel={joinIrcchannel}/>
      
    } else {
      return <p>No channels available</p>
    }
  };

  return (
    <>
      <input type="text" disabled={isGrabbingChannels} onChange={e => sendSearchTerm(e.target.value)} aria-label="Search for a channel to join"/>
      <div>
        <span onClick={() => setData(d => ({ ...d, currentPage: d.currentPage === 1 ? d.currentPage : d.currentPage-1 }))}>{"<"}</span>
        <span>{data.currentPage+1}/{pages}</span>
        <span onClick={() => setData(d => ({ ...d, currentPage: d.currentPage+1 }))}>{">"}</span>
      </div>
      {isGrabbingChannels ? <span>Getting List of Channels...</span> : renderChannels()}
    </>
  )
};

export default IrcJoinableChannels;
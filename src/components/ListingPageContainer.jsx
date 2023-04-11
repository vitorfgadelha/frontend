import React, { useRef, useEffect, useState } from "react";
import ListigPageComponent from "../components/ListingPageComponent";
import axios from "axios";
import { API_URL } from "../constants";

function ListingPageContainer() {
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [userList, setUserList] = useState([]);
  const [lastList, setLastList] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        API_URL + `?page=${currPage}`
      );
      if (!response.data.results.length) {
        setLastList(true);
        return;
      }
      setPrevPage(currPage);
      setUserList([...userList, ...response.data.results]);
    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, userList]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };

  return (
    <ListigPageComponent
      onScroll={onScroll}
      listInnerRef={listInnerRef}
      userList={userList}
    />
  );
}

export default ListingPageContainer;

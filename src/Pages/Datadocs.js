import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Iframe from "react-iframe";
import { useLocation } from "react-router-dom";
import Axios from "axios";

function Datadocs() {
  const { state } = useLocation();
  const [fileUrl, setFileUrl] = useState();
  const proxy = process.env.REACT_APP_PROXY;
  const url = proxy + "/api/visualization";

  useEffect(() => {
    Axios.get(url, {
      headers: {
        reportmart_id: state,
      },
    })
      .then((res) => {
        console.log(res);
        setFileUrl(res.data[0]);
      })
      .catch(() => {});
  }, []);
  return (
    <DocsDetails>
      <Iframe
        url={fileUrl}
        width="100%"
        height="100%"
        id="myId"
        display="flex"
        position="relative"
      />
    </DocsDetails>
  );
}

export default Datadocs;

const DocsDetails = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

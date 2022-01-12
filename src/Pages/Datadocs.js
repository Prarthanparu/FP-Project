import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Iframe from "react-iframe";
import { useLocation } from "react-router-dom";
import Axios from "axios";

function Datadocs() {
  const { state } = useLocation();
  const [fileUrls, setFileUrls] = useState([]);
  const proxy = process.env.REACT_APP_PROXY;
  const url = proxy + "/api/visualization";

  useEffect(() => {
    Axios.get(url, {
      headers: {
        report_mart_id: state,
      },
    })
      .then((res) => {
        console.log(res);
        setFileUrls(res.data.result);
      })
      .catch(() => {});
  }, []);

  return (
    <DocsDetails>
      {fileUrls.map((fileUrl) => {
        return (
          <Iframe
            url={fileUrl}
            width="1700px"
            height="1000px"
            id="myId"
            display="initial"
            position="relative"
          />
        );
      })}
    </DocsDetails>
  );
}

export default Datadocs;

const DocsDetails = styled.div`
  display: block;
  margin-left: -30px;
  overflow-y: scroll;
  max-height: 800px;
`;

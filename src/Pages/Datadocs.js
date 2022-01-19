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
        report_mart_id: state.reportmart_id,
        dataset_ids: [...[-1], ...state.dataset_ids].toString(),
        data_source_id: state.data_source_id,
      },
    })
      .then((res) => {
        setFileUrls(res.data.result);
      })
      .catch(() => {});
  }, []);

  return (
    <DocsDetails>
      {fileUrls.map((fileUrl) => {
        return (
          <IframeDetails>
            <Iframe
              src={fileUrl}
              width="100%"
              height="1000px"
              id="myId"
              display="initial"
              position="relative"
            />
          </IframeDetails>
        );
      })}
    </DocsDetails>
  );
}

export default Datadocs;

const DocsDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -30px;
  width: 100%;
  height: 800px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const IframeDetails = styled.div``;

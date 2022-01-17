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
      }
    })
      .then((res) => {
        setFileUrls(res.data.result);
      })
      .catch(() => { });
  }, []);

  return (
    <>
      {
        fileUrls.map((fileUrl, index) => {
          return (
            <DocsDetails key={index}>
              <Iframe
                url={fileUrl}
                width="1500px"
                height="1000px"
                id="myId"
                display="initial"
                position="relative"
              />
            </DocsDetails>
          );
        })
      }
    </>
  );
}

export default Datadocs;

const DocsDetails = styled.div`
  display: block;
  margin-left: -30px;
  overflow-y: scroll;
  max-height: 800px;
`;

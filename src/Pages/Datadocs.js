import React from "react";
import styled from "styled-components";
import Iframe from "react-iframe";

function Datadocs() {
  return (
    <DocsDetails>
      <Iframe
        url="http://www.youtube.com/embed/xDMP3i36naA"
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
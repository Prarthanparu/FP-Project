import React from "react";
import styled from "styled-components";
import "./App.less";
import AppBody from "./AppBody";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";

function App() {
  return (
    <React.Fragment>
      <Header />
      <MainBody>
        <Sidebar />
        <InnerBody>
          <Collections>
            <AppBody />
          </Collections>
        </InnerBody>
      </MainBody>
    </React.Fragment>
  );
}

export default App;

const MainBody = styled.div`
  position: relative;
`;

const InnerBody = styled.div`
  top: 0;

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Collections = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 156px;
  padding: 30px;
`;

import React from "react";
import styled from "styled-components";
import "./App.less";
import AppBody from "./AppBody";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <MainBody>
        <Sidebar />
        <InnerBody>
          <Collections>
            <AppBody />
          </Collections>
        </InnerBody>
      </MainBody>
    </Provider>
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

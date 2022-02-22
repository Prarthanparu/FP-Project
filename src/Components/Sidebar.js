import React from "react";
import styled from "styled-components";
import {
  NodeIndexOutlined,
  RadarChartOutlined,
  DatabaseOutlined,
  HddOutlined,
  SettingOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <SidebarBody>
      <SidebarComponents>
        <ul>
          <li key="/">
            <Link to="/">
              <NodeIndexOutlined style={{ fontSize: 30 }} />
              <h5>Data Flow</h5>
            </Link>
          </li>
          <li key="1">
            <Link
              to="/configuration/martdetails"
              state={{ from: "datasource" }}
            >
              <RadarChartOutlined style={{ fontSize: 30 }} />
              <h5>Data Source</h5>
            </Link>
          </li>
          <li>
            <Link to="/configuration/reportmart">
              <DatabaseOutlined style={{ fontSize: 30 }} />
              <h5>Reporting Mart</h5>
            </Link>
          </li>
          <li>
            <HddOutlined style={{ fontSize: 30 }} />
            <h5>Analytics</h5>
          </li>
        </ul>
      </SidebarComponents>
      <SidebarFooterComponents>
        <ul>
          <li key="1">
            <Link to="/configuration/setting">
              <SettingOutlined style={{ fontSize: 20 }} />
              <h5>Settings</h5>
            </Link>
          </li>
          <li>
            <ReadOutlined style={{ fontSize: 20 }} />
            <h5>Docs</h5>
          </li>
          <li>
            <h6>V 1.00</h6>
          </li>
        </ul>
      </SidebarFooterComponents>
    </SidebarBody>
  );
}

export default Sidebar;
const SidebarBody = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100px;
  background-color: black;
  border-right-width: 2px;
  border-right-style: solid;
  border-image: linear-gradient(to top, #ef7434, rgba(0, 0, 0, 0)) 1 100%;
`;
const SidebarComponents = styled.div`
  margin-top: 30px;
  flex: 0.75;
  > ul {
    list-style-type: none;
    gap: 20px;
    display: flex;
    flex-direction: column;
    padding: 0px;
    > li {
      text-align: center;
      flex-wrap: wrap;
      padding: 5px;
      flex-direction: column;
      color: #545454;
    }
    > li:hover {
      color: white;
    }
    > li:active {
      color: #ef7434;
    }
    > li > h5 {
      color: #545454;
    }
  }
`;

const SidebarFooterComponents = styled.div`
  display: flex;
  flex: 0.25;
  justify-content: center;
  > ul {
    list-style-type: none;
    gap: 20px;
    display: flex;
    flex-direction: column;
    padding: 0;
    > li {
      text-align: center;
      flex-wrap: wrap;
      flex-direction: column;
      color: #545454;
    }
    > li > h5 {
      color: #545454;
    }
  }
`;

import React from "react";
import { Menu } from "antd";
import styled from "styled-components";
import {
  NodeIndexOutlined,
  RadarChartOutlined,
  DatabaseOutlined,
  HddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <SidebarBody>
      <SidebarComponents>
        <Menu
          style={{ width: 156, height: "100vh" }}
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item
            key="1"
            icon={<NodeIndexOutlined />}
            style={{ marginTop: 35 }}
          >
            Data Flow
          </Menu.Item>

          <Menu.Item
            key="2"
            icon={<DatabaseOutlined />}
            style={{ marginTop: 35 }}
          >
            Data Source
          </Menu.Item>

          <Menu.Item key="3" icon={<HddOutlined />} style={{ marginTop: 35 }}>
            Reporting Mart
          </Menu.Item>

          <Menu.Item
            key="4"
            icon={<RadarChartOutlined />}
            style={{ marginTop: 35 }}
          >
            Analytics
          </Menu.Item>
        </Menu>
      </SidebarComponents>
    </SidebarBody>
  );
}

export default Sidebar;
const SidebarBody = styled.div`
  position: absolute;
  height: 100%;
`;
const SidebarComponents = styled.div`
  background-color: black;
  height: 100%;
  width: 156px;
  gap: 60px;

  border-right-width: 2px;
  border-right-style: solid;
  border-image: linear-gradient(to top, #ef7434, rgba(0, 0, 0, 0)) 1 100%;
`;

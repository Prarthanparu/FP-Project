import React from "react";
import { Tabs, Empty, Button, Card } from "antd";
import styled from "styled-components";
// import DataSource from "../Pages/Datasources";
// import SelectedDatasourceCard from "../Components/SelectedDatasourceCard";
import {
  SearchOutlined,
  FilterOutlined,
  TableOutlined,
  CloseOutlined,
  EditFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function MartDetails() {
  const style = { width: 200 };

  const { TabPane } = Tabs;
  return (
    <MartBody>
      <MartContent>
        <Tabs type="card">
          <TabPane tab="Data Sources" key="1"></TabPane>
          <TabPane tab="Reporting Mart" key="2"></TabPane>
        </Tabs>
      </MartContent>
      <EmptyContent>
        {/* <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 100,
            size: 100,
          }}
          description={<span>The Mart is Empty add new Connections.</span>}
        ></Empty> */}
        {/* <SelectedDatasourceCard /> */}
        <SelectedTables>
          <Card style={{ width: "80%", height: 60, marginTop: 40 }}>
            <p style={{ alignItems: "center" }}>
              <TableOutlined /> Table Name 1
              <span style={{ marginLeft: 1000 }}>
                <CloseOutlined />
              </span>
            </p>
          </Card>
          <Card style={{ width: "80%", height: 60, marginTop: 25 }}>
            <p style={{ alignItems: "center" }}>
              <TableOutlined /> Table Name 1
              <CloseOutlined />
            </p>
          </Card>
          <Card style={{ width: "80%", height: 60, marginTop: 25 }}>
            <p style={{ alignItems: "center" }}>
              <TableOutlined /> Table Name 1
              <span style={{ marginLeft: 1000 }}>
                <CloseOutlined />
              </span>
            </p>
          </Card>
          <Card style={{ width: "80%", height: 60, marginTop: 25 }}>
            <p style={{ alignItems: "center" }}>
              <TableOutlined /> Table Name 1
              <span style={{ marginLeft: 1000 }}>
                <CloseOutlined />
              </span>
            </p>
          </Card>
          <Card style={{ width: "80%", height: 60, marginTop: 25 }}>
            <p style={{ alignItems: "center" }}>
              <TableOutlined /> Table Name 1
              <span style={{ marginLeft: 1000 }}>
                <CloseOutlined />
              </span>
            </p>
          </Card>
          <Card style={{ width: "80%", height: 60, marginTop: 25 }}>
            <p style={{ alignItems: "center" }}>
              <TableOutlined /> Table Name 1
              <span style={{ marginLeft: 1000 }}>
                <CloseOutlined />
              </span>
            </p>
          </Card>
        </SelectedTables>
      </EmptyContent>
      <EmptyContent>
        {/* <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 100,
            size: 100,
          }}
          description={<span>The Mart is Empty add new Connections.</span>}
        ></Empty> */}
        {/* <SelectedDatasourceCard /> */}
        <SelectedTables>
          <Card style={{ width: "80%", height: 60, marginTop: 40 }}>
            <p style={{ alignItems: "center" }}>
              <TableOutlined /> Table Name 1
              <span style={{ marginLeft: 1000 }}>
                <CloseOutlined />
              </span>
            </p>
          </Card>
        </SelectedTables>
      </EmptyContent>
      <ButtonContent>
        <Link to="/">
          {" "}
          <Button type="primary">Add New Connections</Button>
        </Link>
        <Link to="/configuration/datasource/martdetails/qualitychecks">
          {" "}
          <Button>Define Checks</Button>
        </Link>
      </ButtonContent>
    </MartBody>
  );
}

export default MartDetails;

const MartBody = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  flex-direction: column;
`;

const MartContent = styled.div`
  display: flex;
  width: 100%;
`;

const EmptyContent = styled.div`
  /* border: 1px dashed #545454; */
  /* justify-content: center;
  align-items: center; */
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  gap: 20px;
`;

const ButtonContent = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const SelectedTables = styled.div`
  display: flex;
  width: 100%;
  height: 270px;
  flex-direction: column;
  overflow: auto;
`;

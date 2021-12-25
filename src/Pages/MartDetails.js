import React, { useState, useEffect } from "react";
import { Tabs, Button, Card } from "antd";
import styled from "styled-components";
import SelectedDatasourceCard from "../Components/SelectedDatasourceCard";
import { TableOutlined, CloseOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { dataSource } from "../Components/DatasourceCard";

function MartDetails() {
  const [tableList, setTableList] = useState([]);
  const params = useParams();
  let currentSource = dataSource.find(
    (eachSource) => eachSource.id === parseInt(params.id)
  );
  useEffect(() => {
    const arr = params.tableVariables.split(",");
    setTableList(arr);
  }, [params]);
  const { TabPane } = Tabs;

  return (
    <MartBody>
      <MartContent>
        <Tabs type="card" className="customTab">
          <TabPane tab="Data Sources" key="1"></TabPane>
          <TabPane tab="Reporting Mart" key="2"></TabPane>
        </Tabs>
      </MartContent>
      <CardView>
        <CardComponent>
          <SelectedDatasourceCard currentSource={currentSource} />
        </CardComponent>
        <CardContent>
          <p style={{ marginBottom: 0, color: "rgb(205 207 210)", fontSize: "12px" }}>
            {tableList && tableList.length} tables selected from MYSQL
          </p>
          <SelectedTables>
            {tableList &&
              tableList.map((item) => (
                <Card className="customContent" style={{}}>
                  <p>
                    <span>
                      <TableOutlined /> {item}
                    </span>
                    <CloseOutlined />
                  </p>
                </Card>
              ))}
          </SelectedTables>
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
        </CardContent>
      </CardView>
    </MartBody>
  );
}

export default MartDetails;

const MartBody = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  flex-direction: column;
  gap: 40px;
`;

const MartContent = styled.div`
  display: flex;
  width: 100%;
  .customTab {
    margin-left: 100px;
    .ant-tabs-tab {
      margin-right: 10px;
    }
    .ant-tabs-nav::before {
      display: none !important;
    }
  }
`;
const CardView = styled.div`
  display: flex;
  flex-direction: row;
  gap: 90px;
  align-items: flex-start;
  justify-content: center;
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: revert;
`;
const CardComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const ButtonContent = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 100px;
`;

const SelectedTables = styled.div`
  display: flex;
  width: 800px;
  height: 50vh;
  flex-direction: column;
  overflow: auto;
  :first-child {
    margin-top: 0px !important;
  }
  .customContent {
    width: 80%;
    height: 50px;
    margin-top: 10px;
    .ant-card-body {
      padding: 14px !important;
    }
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  customContent:first-child {
    margin-top: 0px !important;
  }
`;

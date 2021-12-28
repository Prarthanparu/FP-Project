import React, { useState, useEffect } from "react";
import { Tabs, Button, Card } from "antd";
import styled from "styled-components";
import SelectedDatasourceCard from "../Components/SelectedDatasourceCard";
import { TableOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { dataSource } from "../Components/DatasourceCard";
import ReportingMart from "./ReportingMart";
import ReportingMartList from "./ReportingMartList";

function MartDetails() {
  const [tableList, setTableList] = useState([]);
  const [martList, setMartList] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  let currentSource = dataSource.find(
    (eachSource) => eachSource.id === parseInt(params.id)
  );
  useEffect(() => {
    const arr = params.tableVariables.split(",");
    setTableList(arr);
  }, [params]);
  const { TabPane } = Tabs;

  function callback(key) {
    console.log(key);
    setMartList(false);
  }
  const handleClick = () => {
    navigate(
      "/configuration/datasource/martdetails/qualitychecks/tablechecks",
      { state: state }
    );
  };
// console.log(state)
  return (
    <MartBody>
      <MartContent>
        <Tabs
          type="card"
          className="customTab"
          defaultActiveKey="1"
          onChange={callback}
        >
          <TabPane tab="Data Sources" key="1">
            <CardView>
              <CardComponent>
                <SelectedDatasourceCard currentSource={currentSource} />
              </CardComponent>
              <CardContent>
                <p
                  style={{
                    marginBottom: 0,
                    color: "rgb(205 207 210)",
                    fontSize: "12px",
                  }}
                >
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
              </CardContent>
            </CardView>
          </TabPane>
          <TabPane tab="Reporting Mart" key="2">
            {!martList ? (
              <ReportingMart setMartList={setMartList} />
            ) : (
              <ReportingMartList />
            )}
          </TabPane>
        </Tabs>
        {martList ? (
          <AddView>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="small"
              className="customButton"
            />
            <p>Create New Reporting Mart</p>
          </AddView>
        ) : (
          ""
        )}
      </MartContent>
      <ButtonContent>
        <Link to="/">
          {" "}
          <Button type="primary">Add New Connections</Button>
        </Link>
        {/* <Link to="/configuration/datasource/martdetails/qualitychecks"> */}{" "}
        <Button onClick={() => handleClick()}>Define Checks</Button>
        {/* </Link> */}
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
  gap: 40px;
`;

const MartContent = styled.div`
  display: flex;
  width: 100%;
  .customTab {
    margin-left: 100px;
    width: 100%;
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
  justify-content: start;
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
const AddView = styled.div`
  text-align: center;
  display: flex;
  .customButton {
    background: linear-gradient(123.32deg, #db5e1d 45.17%, #ef3499 100%);
    box-shadow: 3px 2px 6px #000000;
  }
`;

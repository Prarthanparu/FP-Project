import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { List, Divider, Menu, Dropdown, Button, Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

function DetailedView() {
  const data = [
    {
      title: "report_mart_dataset",
    },
    {
      title: "report_mart_quality_checks",
    },
    {
      title: "datasource",
    },
    {
      title: "datasets",
    },
    {
      title: "report_mart",
    },
    {
      title: "quality_checks",
    },
    {
      title: "quality_check_result",
    },
  ];
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const proxy = process.env.REACT_APP_PROXY;
    const obj = window.history.state.usr;
    const reportmartQualityChecks = proxy + "/api/reportmart_quality_checks";
    axios
      .get(reportmartQualityChecks, {
        headers: { ...obj },
      })
      .then((res) => {
        setIsLoading(false);
        setState(res.data);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, []);
  const menu = (
    <Menu>
      <Menu.Item>
        <h4>1st menu item</h4>
      </Menu.Item>
      <Menu.Item>
        <h4>2nd menu item</h4>
      </Menu.Item>
      <Menu.Item>
        <h4>3rd menu item</h4>
      </Menu.Item>
    </Menu>
  );

  const navigate = useNavigate();
  const handleClickDataset = (e) => {
    navigate(`/configuration/reportmart/detailedview/individualdata`);
  };
  return (
    <DetailedViewBody className="scroll">
      <DetailedViewHeader>
        <a>Datasets Detailed View</a>
      </DetailedViewHeader>
      <DetailedViewContent>
        <DetailedViewContents className="scroll" id="scrollableDiv">
          <Spin
            className="spin"
            tip="Profiling in progress..."
            spinning={isLoading}
          >
            <InfiniteScroll
              dataLength={data.length}
              hasMore={data.length < 50}
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                itemLayout="horizontal"
                dataSource={state}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      onClick={handleClickDataset}
                      style={{
                        border: "1px solid black",
                        padding: "20px",
                        borderRadius: "10px",
                        backgroundColor: "#2D2D2F",
                        cursor: "pointer",
                      }}
                      title={
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flex: 0.5,
                              marginLeft: "25px",
                            }}
                          >
                            <h1 style={{ fontSize: "20px" }}>
                              {item.datset_name}
                            </h1>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              flex: 0.35,
                              marginLeft: "25px",
                            }}
                          >
                            <a>
                              Run Date:{" "}
                              {moment(item.processed_date).format("DD-MM-YYYY")}
                            </a>
                            <h5>There are Several Critical Findings</h5>
                            <ul>
                              <li>
                                <h5>
                                  {item.applied_table_expectations} Table Level
                                  Findings
                                </h5>
                              </li>
                              <li>
                                <h5>
                                  {item.applied_column_expectation} Column Level
                                  Findings
                                </h5>
                              </li>
                            </ul>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              flex: 0.15,
                              marginLeft: "25px",
                            }}
                          >
                            <Dropdown
                              overlay={menu}
                              placement="bottomCenter"
                              arrow
                            >
                              <Button>Take Actions</Button>
                            </Dropdown>
                          </div>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </Spin>
        </DetailedViewContents>
      </DetailedViewContent>
    </DetailedViewBody>
  );
}

export default DetailedView;

const DetailedViewBody = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

const DetailedViewHeader = styled.div`
  margin-bottom: 20px;
  display: flex;
  > a {
    font-size: 25px;
    font-weight: bold;
  }
`;

const DetailedViewContent = styled.div`
  display: flex;
  flex-direction: column;
`;
const DetailedViewContents = styled.div`

  height: 700px;
  overflow: auto;
  
  border: 1px solid rgba(140, 140, 140, 0.35):
`;

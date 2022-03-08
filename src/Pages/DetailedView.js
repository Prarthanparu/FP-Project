import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  List,
  Divider,
  Menu,
  Dropdown,
  Button,
  Spin,
  Breadcrumb,
  Alert,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

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

  const { state } = useLocation();

  const [martData, setMartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const proxy = process.env.REACT_APP_PROXY;
    const obj = state;
    console.log(obj);
    const reportmartQualityChecks = proxy + "/api/reportmart_quality_checks";
    axios
      .get(reportmartQualityChecks, {
        headers: { ...obj },
      })
      .then((res) => {
        setIsLoading(false);
        setMartData(res.data);
      })
      .catch((e) => {
        setIsLoading(false);
      });
  }, []);

  const navigate = useNavigate();
  const handleClickDataset = (list) => {
    list.report_mart_id = state.report_mart_id;
    list.execution_id = state.execution_id;

    navigate(`/configuration/reportmart/detailedview/individualdata`, {
      state: list,
      headerObj: state,
    });
  };
  return (
    <DetailedViewBody className="scroll">
      <DetailedViewHeader>
        <ul>
          <li>
            <Link
              style={{
                marginRight: "10px",
              }}
              to="/configuration/reportmart/"
            >
              Report Mart Checks{" "}
            </Link>{" "}
            /
            <Link
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
              to="/configuration/reportmart/detailedview"
            >
              Detailed Dataset View
            </Link>
          </li>
        </ul>
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
                dataSource={martData}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
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
                            <ul>
                              <li>
                                <h5>
                                  {item.applied_table_expectations} Applied table expectaions
                                </h5>
                              </li>
                              <li>
                                <h5>
                                  {item.applied_column_expectation} Applied column expectaions
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
                            <Button
                              onClick={() => handleClickDataset(item)}
                              type="secondary"
                            >
                              Take Actions
                            </Button>
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
  > ul {
    list-style: none;
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

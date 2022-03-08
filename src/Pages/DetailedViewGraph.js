import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Collapse, Space, message } from "antd";
import { PlusCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { EyeOutlined } from "@ant-design/icons";
import { Pie, Line } from "@ant-design/plots";
import { useNavigate } from "react-router-dom";

import GraphModal from "../Components/GraphModal";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import moment from "moment";

function DetailedViewGraph(props) {
  console.log(props);
  const { Panel } = Collapse;
  const { state } = useLocation();
  console.log(state);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const PieGraph = () => {
    const { state } = useLocation();

    const proxy = process.env.REACT_APP_PROXY;
    const pieGraphUrl = proxy + "/api/pie_graph_data";
    const [data, setData] = useState([
      { type: "Passed", value: 1 },
      { type: "Failed", value: 1 },
    ]);

    useEffect(() => {
      Axios.get(pieGraphUrl, {
        headers: {
          report_mart_id: state.report_mart_id,
          execution_id: state.execution_id,
        },
      })
        .then((res) => {
          const values = [
            { type: "Passed", value: res.data[0].no_of_passed },
            { type: "Failed", value: res.data[0].no_of_failed },
          ];
          setData(values);
        })
        .catch((err) => {
          message.info("Something went wrong");
        });
    }, [pieGraphUrl, state.execution_id, state.report_mart_id]);
    const config = {
      appendPadding: 10,
      data,
      width: 300,
      height: 300,
      angleField: "value",
      colorField: "type",
      color: ["green", "red"],
      radius: 0.9,
      label: {
        type: "outer",
        content: "{name} {percentage}",
      },
      interactions: [
        {
          type: "pie-legend-active",
        },
        {
          type: "element-active",
        },
      ],
    };
    return <Pie {...config} />;
  };
  const DemoLine = (props) => {
    const { state } = useLocation();

    const proxy = process.env.REACT_APP_PROXY;
    const timeSeriesGraphUrl = proxy + "/api/time_series_graph";
    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);

    const asyncFetch = () => {
      Axios.get(timeSeriesGraphUrl, {
        headers: {
          report_mart_id: state.report_mart_id,
        },
      })
        .then((res) => {
          const data_points = res.data.map((item) => {
            return {
              date: moment(item.processed_date).local().format("MM-DD-YYYY HH:mm"),
              value: item.no_of_failed,
            };
          });
          setData(data_points);
        })
        .catch((err) => {
          message.info("Something went wrong");
        });
    };
    const config = {
      data,
      padding: "auto",
      width: 400,
      xField: "date",
      yField: "value",
      annotations: [
        {
          type: "regionFilter",
          start: ["min", "median"],
          end: ["max", "0"],
          color: "#F4664A",
        },
        {
          type: "text",
          position: ["min", "median"],
          content: "Failed",
          offsetY: -4,
          style: {
            textBaseline: "bottom",
          },
        },
        {
          type: "line",
          start: ["min", "median"],
          end: ["max", "median"],
          style: {
            stroke: "#F4664A",
            lineDash: [2, 2],
          },
        },
      ],
    };

    return <Line {...config} />;
  };
  
  const handleRedirect = (column) => {
    setOpen(true);
    setType(column);
  };

  const listData = window && window.history && window.history.state.usr;

  const handleBack = () => {
    navigate(`/configuration/reportmart/detailedview`, {
      state: {
        execution_id: state.execution_id,
        report_mart_id: state.report_mart_id,
      },
    });
  };

  return (
    <MainBody>
      <BackButton onClick={handleBack}>
        <ArrowLeftOutlined />
        &nbsp;Back
      </BackButton>
      <DetailedViewGraphBody>
        <DetailedViewGraphHeader>
          <h2>Percent of Test failed</h2>
        </DetailedViewGraphHeader>
        <DetailedViewChart>
          <PieGraph />
        </DetailedViewChart>
        <DetailedViewGraphHeaderTwo>
          <h2>Count of Test Failures over time</h2>
        </DetailedViewGraphHeaderTwo>
        <DetailedViewChartSecond>
          <DemoLine />
        </DetailedViewChartSecond>
      </DetailedViewGraphBody>
      <GraphBody>
        <DetailedViewGraphContent>
          <TableContentHeader>
            <h1>Table Expectations</h1>
          </TableContentHeader>
          <TableContent>
            <Flex>
              <table cellPadding={10}>
                <thead>
                  <tr>
                    <th>Expecations</th>
                    <th>Details</th>
                  </tr>
                </thead>
                {listData.table_expecatation_list
                  .filter((e) => e === "expect_table_row_count_to_be_between")
                  .map((i, index) => (
                    <tr>
                      <td>
                        <span key={`${index}`}>{i}</span>
                      </td>
                      <td>
                        <Icon
                          onClick={(e) => {
                            handleRedirect("table");
                          }}
                          title="View Details"
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  ))}
              </table>
            </Flex>
          </TableContent>
        </DetailedViewGraphContent>
        <DetailedViewGraphContentOne>
          <TableContentHeader>
            <h1> Column Expectations</h1>
          </TableContentHeader>
          <TableContent>
            <Flex>
              {/* <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              > */}
              <table cellPadding={10}>
                <thead>
                  <tr>
                    <th>Columns</th>
                    <th>Expecations</th>
                    <th>Details</th>
                  </tr>
                </thead>

                {listData.column_expecatation_list.map(
                  (expectation, expectationIndex) => (
                    <tr>
                      {/* <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: "5px",
                            justifyContent: "space-between",
                          }}
                        > */}
                      <td>
                        <span
                          style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            color: " #EF7434",
                          }}
                        >
                          {Object.keys(expectation)[0]}
                        </span>
                      </td>
                      <td>
                        <span>{Object.values(expectation)[0]}</span>
                      </td>
                      <td>
                        <Icon
                          onClick={(e) => {
                            handleRedirect(Object.keys(expectation)[0]);
                          }}
                          title="View Details"
                          style={{ fontSize: "20px", cursor: "pointer" }}
                        />
                      </td>
                      {/* </div> */}
                    </tr>
                  )
                )}
              </table>
              {/* </span> */}
            </Flex>
          </TableContent>
        </DetailedViewGraphContentOne>
      </GraphBody>

      {open && (
        <GraphModal
          isModalVisible={open}
          type={type}
          setIsModalVisible={setOpen}
          handleCancel={() => setOpen(false)}
          handleOk={() => setOpen(false)}
          datasetId={state.dataset_id}
          reportMartId={state.report_mart_id}
          execution_id={state.execution_id}
        />
      )}
    </MainBody>
  );
}

export default DetailedViewGraph;

const MainBody = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 40px;
`;

const DetailedViewGraphBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid black;
  background-color: #2d2d2f;
  flex: 1;
  gap: 80px;
  padding-left: 50px;
`;
const DetailedViewGraphContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const DetailedViewGraphContentOne = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const TableContentHeader = styled.div``;
const TableContent = styled.div``;
const GraphBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
  gap: 50px;
`;

const DetailedViewChart = styled.div`
  display: flex;
  flex: 0.2;
`;
const DetailedViewChartSecond = styled.div`
  display: flex;
  flex: 0.4;
`;

const DetailedViewGraphHeader = styled.div`
  display: flex;
  flex: 0.2;
  align-items: center;
`;
const DetailedViewGraphHeaderTwo = styled.div`
  display: flex;
  flex: 0.2;
  align-items: center;
`;
const Flex = styled.p`
  display: flex;
  align-items: end;
  overflow-y: auto;
  margin-bottom: 0;
`;
const Icon = styled(EyeOutlined)`
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    color: orange;
  }
`;
const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 16px;
  font-weight: bold;
  color: rgb(239, 116, 52);
`;

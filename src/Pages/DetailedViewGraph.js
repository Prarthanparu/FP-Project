import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { Pie, Line } from "@ant-design/plots";

function DetailedViewGraph() {
  const { Panel } = Collapse;

  const text = `
-->  Row Count of 725 is outside of the expected range of 1681 and 2377
`;

  const DemoPie = () => {
    const data = [
      {
        type: "type-A",
        value: 27,
      },
      {
        type: "type-B",
        value: 25,
      },
      {
        type: "type-C",
        value: 18,
      },
      {
        type: "type-D",
        value: 15,
      },
      {
        type: "type-E",
        value: 10,
      },
      {
        type: "type-F",
        value: 5,
      },
    ];
    const config = {
      appendPadding: 10,
      data,
      width: 300,
      height: 300,
      angleField: "value",
      colorField: "type",
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
  const DemoLine = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      asyncFetch();
    }, []);

    const asyncFetch = () => {
      fetch(
        "https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
      )
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log("fetch data failed", error);
        });
    };
    const config = {
      data,
      padding: "auto",
      width: 400,
      xField: "Date",
      yField: "scales",
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
          content: "中位数",
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

  return (
    <MainBody>
      <DetailedViewGraphBody>
        <DetailedViewGraphHeader>
          <h2>Percent of Test failed</h2>
        </DetailedViewGraphHeader>
        <DetailedViewChart>
          <DemoPie />
        </DetailedViewChart>
        <DetailedViewGraphHeaderTwo>
          <h2>Count of Test Failuers over time</h2>
        </DetailedViewGraphHeaderTwo>
        <DetailedViewChartSecond>
          <DemoLine />
        </DetailedViewChartSecond>
      </DetailedViewGraphBody>
      <DetailedViewGraphContent>
        <TableContentHeader>
          <h1>Gross Charge Off Rate</h1>
        </TableContentHeader>
        <TableContent>
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse"
          >
            <Panel
              header="report_mart_dataset"
              key="1"
              className="site-collapse-custom-panel"
            >
              <p>{text}</p>
            </Panel>
          </Collapse>
        </TableContent>
      </DetailedViewGraphContent>
      <DetailedViewGraphContent>
        <TableContentHeader>
          <h1>Net Charge Offs</h1>
        </TableContentHeader>
        <TableContent>
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse"
          >
            <Panel
              header="report_mart_dataset"
              key="1"
              className="site-collapse-custom-panel"
            >
              <p>{text}</p>
            </Panel>
          </Collapse>
        </TableContent>
      </DetailedViewGraphContent>
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
  padding-left: 50px;
`;
const DetailedViewGraphContent = styled.div``;

const TableContentHeader = styled.div``;
const TableContent = styled.div``;

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
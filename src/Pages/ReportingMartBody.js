import React, { useState, useEffect } from "react";
import { Table, Menu, Space } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Axios from "axios";
import ExpandedRowRender from "./ExpandedRowRender";

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

const ReportingMartBody = ({ suiteData }) => {

  const proxy = process.env.REACT_APP_PROXY;
  const visualizationUrl = proxy + "/api/visualization";
  const [visualizations, setVisualizations] = useState([]);

  useEffect(() => {
    Axios.get(visualizationUrl, {
      headers: {
        report_mart_id: 3
      }
    })
      .then((res) => {
        setVisualizations(res.data);
      })
      .catch(() => { });
    // Always keep empty array in the end of useEffect for initializing
  }, []);

  const columns = [
    { title: "Name", dataIndex: "report_mart_name", key: "report_mart_name" },
    {
      title: "Number of Data Sources",
      dataIndex: "no_of_datasources",
      key: "no_of_datasources",
    },
    { title: "Number of Tables", dataIndex: "no_of_datasets", key: "no_of_datasets" },
    {
      title: "Table Expectations",
      dataIndex: "no_of_table_expectations",
      key: "no_of_table_expectations",
    },
    {
      title: "Column Expectations",
      dataIndex: "no_of_column_expectations",
      key: "no_of_column_expectations",
    },
    { title: "Actions", key: "action", render: () => <EditOutlined /> },
  ];

  const expandedRowRender = (props) => {
    const proxy = process.env.REACT_APP_PROXY;
    const visualizationUrl = proxy + "/api/visualization";
    const data = [];

    const test = async () => {
      await Axios.get(visualizationUrl, {
        headers: {
          report_mart_id: props.report_mart_id
        }
      })
        .then((res) => {
          console.log(res);
          res.data.output.forEach((element) => {
            data.push({
              key: element.id,
              processeddata: element.processed_date,
              executionStartTime: element.start_time,
              executionEndTime: element.end_time,
              pass: element.no_of_passed,
              fail: element.no_of_failed,
              status: element.status,
            });
          });
        }).catch((e) => {console.log(e); });
    }

    async function x(x)
    {
      await test();
    }

    x();

    const columns = [
      {
        title: "Processed Data",
        dataIndex: "processedDate",
        key: "processedDate",
      },
      {
        title: "Execution Start Time",
        dataIndex: "executionStartTime",
        key: "executionStartTime",
      },
      {
        title: "Execution End Time",
        dataIndex: "executionEndTime",
        key: "executionEndTime",
      },
      { title: "Pass", dataIndex: "noOfPassed", key: "noOfPassed" },
      { title: "Fail", dataIndex: "noOfFailed", key: "noOfFailed" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (record) => (
          <p
            style={{
              color:
                record === "review"
                  ? "red"
                  : record === "Approved"
                  ? "green"
                  : "yellow",
            }}
          >
            {record}
          </p>
        ),
      },

      {
        title: "Action",
        dataIndex: "",
        key: "",
        render: () => (
          <Space size="middle">
            <EyeOutlined />
          </Space>
        ),
      },
    ];

console.log(data);
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="innerTable"
      />
    );
  };

  return (
    <Wrapper>
      <WrapperHeader>
        <a href="">Quality Checks</a>
      </WrapperHeader>

      <Table
        className="components-table-demo-nested"
        columns={columns}

        expandable={{expandedRowRender}}
        rowKey={(record) => record.report_mart_id}
        dataSource={suiteData}
      />
    </Wrapper>
  );
}

export default ReportingMartBody;

const Wrapper = styled.div`
  .innerTable {
    .ant-table-thead {
      .ant-table-cell {
        color: #ef7434;
      }
    }
    .ant-table-thead > tr > th {
      border-top: 4px solid #111010;
      border-bottom: 4px solid #111010;
    }
  }
`;

const WrapperHeader = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  > a {
    font-size: 25px;
    font-weight: bold;
  }
`;

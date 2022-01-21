import React, { useState } from "react";
import { Table, Space } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Axios from "axios";
import moment from "moment";

const ReportingMartBody = ({ suiteData }) => {
  const proxy = process.env.REACT_APP_PROXY;
  const visualizationUrl = proxy + "/api/visualization";
  const [reportMartData, setReportMartData] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const columns = [
    { title: "Name", dataIndex: "report_mart_name", key: "report_mart_name" },
    {
      title: "Number of Data Sources",
      dataIndex: "no_of_datasources",
      key: "no_of_datasources",
    },
    {
      title: "Number of Datsets",
      dataIndex: "no_of_datasets",
      key: "no_of_datasets",
    },
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
    {
      title: "Actions",
      key: "action",
      render: () => (
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <section>
            <a href="">Execute</a>
          </section>
        </div>
      ),
    },
  ];

  const handleExpend = (expanded, record) => {
    const keys = [];
    if (expanded) {
      keys.push(record.report_mart_id);
      Axios.get(visualizationUrl, {
        headers: {
          report_mart_id: record.report_mart_id,
        },
      })
        .then((res) => {
          setReportMartData(res.data.output);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    setExpandedRowKeys(keys);
  };
  const expandedRowRender = () => {
    const columns = [
      {
        title: "Processed Date",
        dataIndex: "processed_date",
        key: "processed_date",
      },
      {
        title: "Execution Start Time",
        dataIndex: "start_time",
        key: "start_time",
        render: (record) => moment(record).format("YYYY-DD-MMMM"),
      },
      {
        title: "Execution End Time",
        dataIndex: "end_time",
        key: "end_time",
        render: (record) => moment(record).format("YYYY-DD-MMMM"),
      },
      { title: "Pass", dataIndex: "no_of_failed", key: "no_of_failed" },
      { title: "Fail", dataIndex: "no_of_passed", key: "no_of_passed" },
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
            <EyeOutlined style={{ fontSize: "20px" }} />
          </Space>
        ),
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={reportMartData}
        pagination={false}
        className="innerTable"
        scroll={{ y: 400 }}
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
        expandable={{ expandedRowRender }}
        onExpand={(expanded, record) => handleExpend(expanded, record)}
        rowKey={(record) => record.report_mart_id}
        dataSource={suiteData}
        expandedRowKeys={expandedRowKeys}
      />
    </Wrapper>
  );
};

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

import React from "react";
import { Table, Menu, Space } from "antd";
import { FolderViewOutlined, EditOutlined } from "@ant-design/icons";
import styled from "styled-components";

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

function ReportingMartBody() {
  const expandedRowRender = () => {
    const columns = [
      {
        title: "Processed Data",
        dataIndex: "processeddata",
        key: "processedData",
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
      { title: "Pass", dataIndex: "pass", key: "pass" },
      { title: "Fail", dataIndex: "fail", key: "fail" },
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
            <FolderViewOutlined />
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        processeddata: "2014-12-24 23:12:00",
        executionStartTime: "2014-12-24 23:12:00",
        executionEndTime: "This is production name",
        pass: "4",
        fail: "12",
        status: i === 1 ? "Approved" : i === 2 ? "review" : "pending",
        action: "Upgraded: 56",
      });
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        className="innerTable"
      />
    );
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Number of Data Sources",
      dataIndex: "numDatasource",
      key: "numDatasource",
    },
    { title: "Number of Tables", dataIndex: "numTables", key: "numTables" },
    {
      title: "Table Expectations",
      dataIndex: "numTableExpetations",
      key: "numTableExpetations",
    },
    {
      title: "Column Expectations",
      dataIndex: "numColumnExpetations",
      key: "numColumnExpetations",
    },
    { title: "Actions", key: "action", render: () => <EditOutlined /> },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: "Screem",
      numDatasource: "1",
      numTables: "3",
      numTableExpetations: "2",
      numColumnExpetations: "6",
    });
  }
  return (
    <Wrapper>
      <WrapperHeader>
        <a href="">Quality Checks</a>
      </WrapperHeader>

      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
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

import React from "react";
import styled from "styled-components";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { Input, DatePicker, Table } from "antd";
import SelectedTableCard from "../SelectedTableCard";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { Steps, Popover } from "antd";

function DatasourceTable() {
  const { Step } = Steps;

  const columns = [
    {
      title: "Column Name",
      width: 50,
      dataIndex: "name",
      key: "name",
      fixed: "center",
    },
    {
      title: "Expectations",
      width: 60,
      dataIndex: "description",
      key: "discription",
      fixed: "center",
    },
    {
      title: "Add Expectations",
      key: "operation",
      width: 20,
      render: () => (
        <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
          <Button type="secondary">Select</Button>
        </div>
      ),
    },
  ];
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: ` Edrward ${i}`,
    });
  }

  const customDot = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  const suffix = (
    <SearchOutlined
      style={{
        fontSize: 20,
        color: "#ef7434",
      }}
    />
  );

  const suffix1 = (
    <FilterOutlined
      style={{
        fontSize: 20,
        color: "#ef7434",
      }}
    />
  );

  return (
    <Tableview>
      <CardComponent>
        <SelectedTableCard />
      </CardComponent>
      <TableContent>
        <Header>
          <h1>Add Quality Checks</h1>
          <Steps progressDot={customDot} current={1}>
            <Step title="Table Expectations" />
            <Step title="Column Expectations" />
          </Steps>
        </Header>

        <Components>
          <Input
            placeholder="Search Your Source"
            style={{ width: 283, height: 41 }}
            suffix={suffix}
          />
          <Input
            placeholder="Search Your Source"
            style={{ width: 147, height: 41 }}
            suffix={suffix1}
          />

          <DatePicker size={"large"} />
        </Components>
        <ExpectationsTable>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ x: 800, y: 400 }}
            style={{ width: "100%" }}
          />
        </ExpectationsTable>
        <ButtonContent>
          <Link to="">
            {" "}
            <Button type="primary">Apply</Button>
          </Link>
          <Link to="">
            {" "}
            <Button>Next</Button>
          </Link>
        </ButtonContent>
      </TableContent>
    </Tableview>
  );
}

export default DatasourceTable;

const Tableview = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const CardComponent = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > h4 {
    margin-top: 20px;
    font-weight: bold;
  }
`;

const TableContent = styled.div`
  display: flex;
  flex: 8;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  > h1 {
    font-weight: bold;
    font-size: 30px;
    letter-spacing: 0.05em;
    color: #ef7434;
  }
`;

const Components = styled.div`
  display: flex;
  width: 80%;
  margin-top: 30px;
  justify-content: flex-start;
  gap: 20px;
`;

const ExpectationsTable = styled.div`
  height: 500px;
  width: 80%;
  justify-content: center;
  overflow: auto;
  margin-top: 20px;
`;
const ButtonContent = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

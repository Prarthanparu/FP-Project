import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  EyeInvisibleFilled,
  EditFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { Input, DatePicker, Checkbox, Table } from "antd";
import SelectedTableCard from "../SelectedTableCard";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { List, Steps, Popover } from "antd";

function DatasourceTable() {
  const { Step } = Steps;
  const expectation = [
    {
      title: "expect_table_row_count_to_equal",
    },
    {
      title: "expect_value_at_index",
    },
    {
      title: "expect_table_row_count_to_equal_other_table",
    },
    {
      title: "expect_table_columns_to_match_set",
    },
    {
      title: "expect_table_columns_to_match_ordered_list",
    },
    {
      title: "expect_table_row_count_to_be_between",
    },
    {
      title: "expect_table_row_count_to_be_between",
    },
    {
      title: "expect_table_row_count_to_be_between",
    },
    {
      title: "expect_table_row_count_to_equal",
    },
    {
      title: "expect_value_at_index",
    },
    {
      title: "expect_table_row_count_to_equal_other_table",
    },
    {
      title: "expect_table_columns_to_match_set",
    },
    {
      title: "expect_table_row_count_to_equal",
    },
    {
      title: "expect_value_at_index",
    },
    {
      title: "expect_table_row_count_to_equal_other_table",
    },
    {
      title: "expect_table_columns_to_match_set",
    },
  ];
  const columns = [
    {
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "center",
    },
    {
      width: 40,
      dataIndex: "date",
      key: "date",
      fixed: "center",
    },
    {
      key: "operation",
      width: 40,
      render: () => (
        <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
          <p>
            <EditFilled />
          </p>
          <p>
            <EyeInvisibleFilled />
          </p>
          <p>
            <Checkbox />
          </p>
        </div>
      ),
    },
  ];

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
        <h4>Default Selected Table Expectation</h4>
        <DefaultExpectations>
          <List
            itemLayout="horizontal"
            dataSource={expectation}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a key="">
                    <EditOutlined />
                  </a>,
                  <a key="">
                    <DeleteOutlined />
                  </a>,
                ]}
              >
                <List.Item.Meta
                  itemLayout="horizontal"
                  title={<a>{item.title}</a>}
                />
              </List.Item>
            )}
          />
        </DefaultExpectations>
      </CardComponent>
      <TableContent>
        <Header>
          <h1>Add Quality Checks</h1>
          <Steps progressDot={customDot} current={0}>
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
          <CheckboxSelect>
            <Checkbox onChange={onChange}>Select All</Checkbox>
          </CheckboxSelect>
        </Components>
        <ExpectationsList>
          <List
            itemLayout="horizontal"
            dataSource={expectation}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Checkbox />}
                  itemLayout="horizontal"
                  title={<a>{item.title}</a>}
                />
              </List.Item>
            )}
          />
        </ExpectationsList>
        <ButtonContent>
          <Button type="primary">Apply</Button>

          <Link
            to={
              "/configuration/datasource/martdetails/qualitychecks/columnchecks"
            }
          >
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
  flex: 3;
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
  flex: 7;
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
  width: 100%;
  margin-top: 30px;
  justify-content: center;
  gap: 20px;
`;
const CheckboxSelect = styled.div`
  display: flex;
  margin-left: 160px;
  align-items: center;
`;
const DefaultExpectations = styled.div`
  height: 400px;
  width: 100%;
  overflow: auto;
  padding: 0 16px;
  border: 1px solid black;
  border-radius: 10px;
  filter: drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.5));
`;
const ExpectationsList = styled.div`
  height: 500px;
  width: 80%;
  overflow: auto;
  padding: 0 16px;
  margin-top: 20px;
  border: 1px solid black;
  border-radius: 10px;
  filter: drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.5));
`;
const ButtonContent = styled.div`
  display: flex;
  width: 80%;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

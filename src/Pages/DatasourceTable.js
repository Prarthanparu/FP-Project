import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  SearchOutlined,
  FilterOutlined,
  TableOutlined,
  EyeInvisibleFilled,
  EditFilled,
} from "@ant-design/icons";
import { Input, DatePicker, Checkbox, Table } from "antd";
import SelectedDatasourceCard from "../Components/SelectedDatasourceCard";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { dataSource } from "../Components/DatasourceCard";
import Axios from "axios";

const columns = [
  {
    width: 100,
    title: "Select All",
    dataIndex: "",
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 30,
          justifyContent: "flex-end",
        }}
      >
        <p>
          <EditFilled />
        </p>
        <p>
          <EyeInvisibleFilled />
        </p>
      </div>
    ),
  },
];

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

function DatasourceTable() {
  const [tableData, setTableData] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const url =
    "http://191e-2401-4900-4fc5-7d37-57a5-991f-8365-1727.ngrok.io/api/schemainfo";
  const params = useParams();

  let currentSource = dataSource.find(
    (eachSource) => eachSource.id === parseInt(params.id)
  );

  useEffect(() => {
    Axios.get(
      url,

      {
        headers: {
          datasource_id: params.responseid,
          source_type: currentSource.source_type,
        },
      }
    ).then((res) => {
      // console.log(res.data);
      setTableData(res.data);
    });
  }, [params]);
  // let data = [];
  // for (let i = 0; i < 100; i++) {
  //   data.push({
  //     key: i,
  //     name: data,
  //     date: "06/12/2021",
  //   });
  // }

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  function onSelectChange(selectedRowKeys) {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // console.log({ selectedRowKeys });
  return (
    <Tableview>
      <CardComponent>
        <SelectedDatasourceCard currentSource={currentSource} />
        <Button>
          <TableOutlined /> Create Custom Table
        </Button>
      </CardComponent>
      <TableContent>
        <Header>
          <h1>Select The Table From the DataSource</h1>
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

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          scroll={{ x: 800, y: 400 }}
          style={{ width: 900, marginTop: 30 }}
        />
        <ButtonPosition>
          <Link to={"/configuration/datasource/martdetails"}>
            <Button type="primary">Add Tables</Button>
          </Link>
        </ButtonPosition>
      </TableContent>
    </Tableview>
  );
}

export default DatasourceTable;
const Tableview = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 40px;
  margin-left: 200px;
  .ant-table-row-selected {
    background-color: #1d1d1d;
    "&:hover": {
      background-color: #1a1a1c !important;
    }
  }
`;
const CardComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const TableContent = styled.div`
  display: flex;
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
  margin-top: 25px;
  justify-content: center;
  gap: 20px;
`;
const CheckboxSelect = styled.div`
  display: flex;
  margin-left: 160px;
  align-items: center;
`;
const ButtonPosition = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  width: 100%;
`;

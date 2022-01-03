import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  SearchOutlined,
  FilterOutlined,
  TableOutlined,
  EyeInvisibleFilled,
  EditFilled,
} from "@ant-design/icons";
import { Input, DatePicker, Checkbox, Table, message, Spin } from "antd";
import SelectedDatasourceCard from "../Components/SelectedDatasourceCard";
import { Button } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { dataSource } from "../Components/DatasourceCard";
import Axios from "axios";

const columns = [
  {
    width: 100,
    title: "Select All",
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [payload, setPayloadData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const url = "http://37ad-175-101-108-122.ngrok.io/api/schemainfo";
  const datasetUrl = "http://37ad-175-101-108-122.ngrok.io/api/datasetdetails";
  const expectationURL =
    "http://37ad-175-101-108-122.ngrok.io/api/expectationsuite";

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  let currentSource = dataSource.find(
    (eachSource) => eachSource.id === parseInt(params.id)
  );

  useEffect(() => {
    setLoading(true);
    const pay = {
      1: {
        datasource_id: JSON.stringify(location.state.response_id),
        source_type: location.state.source_type,
      },
    };

    Axios.post(url, pay)
      .then((res) => {
        setLoading(false);
        console.log(res, "response");
        const data = [];
        for (let i = 0; i < res.data.length; i++) {
          data.push({
            key: res.data[i],
            name: res.data[i],
          });
        }
        setTableData(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [params, currentSource]);
  console.log({ tableData });
  useEffect(() => {
    const newArr = [];
    for (let i = 0; i < selectedRowKeys.length; i++) {
      newArr.push({
        type: "table",
        discription: selectedRowKeys[i],
      });
    }
    setPayloadData(newArr);
  }, [selectedRowKeys]);

  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  function onSelectChange(selectedRowKeys) {
    setSelectedRowKeys(selectedRowKeys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleClick = () => {
    setScreenLoading(true);
    if (!payload.length) {
      message.info("please select at least one item");
    } else {
      setBtnLoading(!btnloading);
      Axios.post(
        datasetUrl,
        payload,

        {
          headers: {
            dataset_name: "default Value",
            source_id: params.responseid,
          },
        }
      )
        .then((res) => {
          Axios.post(expectationURL, null, {
            headers: {
              id: res.data.datasets_response_id,
            },
          })
            .then((res) => {
              setScreenLoading(false);
              setBtnLoading(!btnloading);
              navigate(
                "/configuration/datasource/martdetails/" +
                  params.id +
                  "/datasourcetable/" +
                  params.responseid +
                  "/" +
                  selectedRowKeys,
                { state: res.data.expectations }
              );
              message.success("Profiling Done Successfully!");
            })
            .catch((err) => {
              setBtnLoading(!btnloading);
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          message.info("Something went wrong");
        });
    }
  };
  return (
    <Tableview style={{ marginLeft: loading ? "0" : "200px" }}>
      {!loading ? (
        <React.Fragment>
          <CardComponent>
            <SelectedDatasourceCard currentSource={location.state} />
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
            <Spin tip="Profiling in Progress..." spinning={screenLoading}>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={tableData}
                pagination={false}
                scroll={{ x: 800, y: 400 }}
                style={{ width: 900, marginTop: 30 }}
              />
            </Spin>

            <ButtonPosition>
              <Button
                type="primary"
                loading={btnloading}
                onClick={() => handleClick()}
              >
                Add Tables
              </Button>
            </ButtonPosition>
          </TableContent>
        </React.Fragment>
      ) : (
        <Spin className="loading" />
      )}
    </Tableview>
  );
}

export default DatasourceTable;
const Tableview = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 40px;
  .loading {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
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
  margin-top: 100px;
  width: 100%;
`;

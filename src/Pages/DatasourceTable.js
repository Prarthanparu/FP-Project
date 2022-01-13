import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  SearchOutlined,
  FilterOutlined,
  TableOutlined,
  EyeInvisibleFilled,
  EditFilled,
} from "@ant-design/icons";
import { Input, DatePicker, Checkbox, Table, message, Spin, Form } from "antd";
import SelectedDatasourceCard from "../Components/SelectedDatasourceCard";
import { Button, Select } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { dataSourceTypes } from "../Components/dataSourceTypes";
import Axios from "axios";
import ModalComponent from "../Components/Modal";
import QueryTable from "./QueryTable";

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
const { Option } = Select;

function DatasourceTable() {
  const [tableData, setTableData] = useState();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [payload, setPayloadData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [itemReportMartId, setItemReportMartId] = useState();
  const [dropDown, setDropDown] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const [textArea, setTextArea] = useState(false);
  const [inputQuery, setInputQuery] = useState();

  const proxy = process.env.REACT_APP_PROXY;
  const url = proxy + "/api/schemainfo";
  const expectationURL = proxy + "/api/expectationsuite";
  const datasetUrl = proxy + "/api/datasetdetails";
  const reportMart = proxy + "/api/report_mart";
  const reportmartDetailsUrl = proxy + "/api/report_mart_dataset";

  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  let currentSource = dataSourceTypes.find(
    (eachSource) => eachSource.source_type === location.state.source_type
  );

  useEffect(() => {
    setLoading(true);
    const pay = {
      1: {
        datasource_id: JSON.stringify(
          location.state.id ? location.state.id : location.state.response_id
        ),
        source_type: location.state.source_type,
      },
    };

    Axios.post(url, pay)
      .then((res) => {
        setLoading(false);
        const data = [];
        res.data &&
          res.data[params.responseid].forEach((e) => {
            data.push({
              key: e,
              name: e,
            });
          });
        setTableData(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [params, currentSource]);

  useEffect(() => {
    const newArr = [];
    for (let i = 0; i < selectedRowKeys.length; i++) {
      newArr.push({
        type: "table",
        description: selectedRowKeys[i],
      });
    }
    setPayloadData(newArr);
  }, [selectedRowKeys]);

  const handleOk = () => {
    Axios.post(datasetUrl, payload, {
      headers: {
        dataset_name: "Dummy Data",
        type: "dataset",
        source_id: params.responseid,
      },
    })
      .then((res) => {
        console.log(res);
        Axios.post(reportMart, null, {
          headers: {
            datasource_id: location.state.response_id,
            reportmart_name: name,
          },
        }).then((res) => {
          setDropDown(!dropDown);
        });
      })
      .catch((err) => {
        message.info("Something went wrong");
      });

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };
  useEffect(() => {
    Axios.get(reportMart, {
      id: location.state.response_id
        ? location.state.response_id
        : location.state.id,
      reportmart_name: "testing",
    })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setMenuItems(res.data);
        } else {
          setMenuItems([]);
        }
      })
      .catch(() => {});
  }, [dropDown]);

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
    const newArr = [];
    newArr.push({
      type: "query",
      description: inputQuery ? inputQuery : "",
    });
    if (!payload.length && !textArea) {
      setScreenLoading(false);
      message.info("please select at least one item");
    } else if (!itemReportMartId) {
      setScreenLoading(false);
      message.info("please choose reporting mart");
    } else {
      setBtnLoading(!btnloading);

      Axios.post(
        datasetUrl,
        textArea ? newArr : payload,

        {
          headers: {
            dataset_name: "Dummy Data",
            type: textArea ? "query" : "dataset",
            source_id: params.responseid,
          },
        }
      ).then((response) => {
        Axios.post(
          reportmartDetailsUrl,
          {
            id: response.data.datasets_response_id,
          },
          {
            headers: {
              reportmart_id: itemReportMartId,
            },
          }
        )
          .then((res) => {
            console.log(res);
            Axios.post(
              expectationURL,
              {
                dataset_ids: response.data.datasets_response_id,
                report_mart_id: itemReportMartId,
              },
              {
                headers: {
                  type: "reportmart",
                },
              }
            )
              .then((res) => {
                setScreenLoading(false);
                setBtnLoading(false);
                navigate("/configuration/datasource/martdetails/tablechecks", {
                  state: {
                    expectations:
                      res.data &&
                      res.data.result[response.data.datasets_response_id]
                        .expectations,
                    reportmart_id: res.data && res.data.report_mart_id,
                  },
                });
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
      });
    }
  };
  function handleSelectChange(value, option) {
    if (value === "+ Create Reporting Mart") {
      setIsModalVisible(true);
    } else {
      setSelectedDropdown(value);
      setItemReportMartId(option.key);
    }
  }

  return (
    <Tableview style={{ marginLeft: loading ? "0" : "200px" }}>
      {!loading ? (
        <React.Fragment>
          <CardComponent>
            <SelectedDatasourceCard currentSource={currentSource} />
            <Button onClick={() => setTextArea(true)}>
              <TableOutlined /> Create Custom Table
            </Button>
          </CardComponent>
          <TableContent>
            <Header>
              <h1>Select The Table From the DataSource</h1>
              {selectedDropdown && (
                <h3>
                  {" "}
                  <a>Reporting Mart Name:</a> {selectedDropdown}
                </h3>
              )}
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
              {textArea ? null : (
                <CheckboxSelect>
                  <Checkbox onChange={onChange}>Select All</Checkbox>
                </CheckboxSelect>
              )}
            </Components>
            <Spin
              className="spin"
              tip="Profiling in Progress..."
              spinning={screenLoading}
            >
              {textArea ? (
                <QueryTable
                  inputQuery={inputQuery}
                  setInputQuery={setInputQuery}
                />
              ) : (
                <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={tableData}
                  pagination={false}
                  scroll={{ x: 800, y: 400 }}
                  style={{ width: 900, marginTop: 30 }}
                />
              )}
            </Spin>
            <DropdownElement>
              <Select
                style={{ width: 250 }}
                onChange={handleSelectChange}
                placeholder="Choose Reporting Mart"
              >
                <Option value="+ Create Reporting Mart">
                  + Create Reporting Mart
                </Option>
                {menuItems &&
                  menuItems.length > 0 &&
                  menuItems.map((item) => (
                    <Option key={item.id} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
              </Select>
            </DropdownElement>
            <ButtonPosition>
              <Button
                type="primary"
                loading={btnloading}
                onClick={() => handleClick()}
              >
                {textArea ? "Add Custom Data" : "Add Tables"}
              </Button>
            </ButtonPosition>
          </TableContent>
        </React.Fragment>
      ) : (
        <Spin className="loading" />
      )}
      {isModalVisible && (
        <ModalComponent
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          OkText="Create"
          width="461.15px"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Reporting Mart Name"
              style={{ fontWeight: "bold" }}
            >
              <Input
                onChange={(e) => handleChange(e)}
                id="name"
                value={name}
                type="text"
                placeholder="Please enter Name here"
              />
            </Form.Item>
          </Form>
        </ModalComponent>
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
  .ant-spin-nested-loading {
    width: 100%;
  }
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
  margin-top: 10px;
  width: 100%;
`;

const DropdownElement = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-start;
  width: 100%;
`;

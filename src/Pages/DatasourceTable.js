import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  SearchOutlined,
  FilterOutlined,
  TableOutlined,
  EditFilled,
} from "@ant-design/icons";
import { Input, Table, message, Spin, Form, notification } from "antd";
import SelectedDatasourceCard from "../Components/SelectedDatasourceCard";
import { Button, Select } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { dataSourceTypes } from "../Components/dataSourceTypes";
import Axios from "axios";
import ModalComponent from "../Components/Modal";
import QueryTable from "./QueryTable";
import { useDispatch } from "react-redux";
import { addExpectationData } from "../redux/slices/dataSourceSlice";

function DatasourceTable() {
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [payload, setPayloadData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [period, setPeriod] = useState(12);
  const [standardDeviation, setStandardDeviation] = useState(2);

  const [dropdownPeriod, setDropdownPeriod] = useState("");
  const [dropdownname, setDropdownName] = useState(" ");
  const [menuItems, setMenuItems] = useState([]);
  const [itemReportMartId, setItemReportMartId] = useState();
  const [dropDown, setDropDown] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const [textArea, setTextArea] = useState(false);
  const [inputQuery, setInputQuery] = useState();
  const [inputName, setInputName] = useState();
  const [data, setData] = useState([]);

  const proxy = process.env.REACT_APP_PROXY;
  const url = proxy + "/api/schemainfo";

  const expectationURL = proxy + "/api/expectations";
  const datasetUrl = proxy + "/api/datasetdetails";
  const reportMart = proxy + "/api/report_mart";
  const reportmartDetailsUrl = proxy + "/api/report_mart_dataset";
  const columnData = proxy + "/api/date_columns/" + selectedRowKeys;

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  let currentSource = dataSourceTypes.find(
    (eachSource) => eachSource.source_type === location.state.source_type
  );

  const handleColumn = () => {
    if (selectedRowKeys && selectedRowKeys.length > 0) {
      Axios.get(columnData, {
        headers: {
          datasource_id: location.state.source_id,
          source_type: location.state.source_type,
        },
      })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          message.info("Something went wrong");
        });
    } else {
      message.info("Please select a row");
    }
  };

  const columns = [
    {
      width: 60,
      title: "Select All",
      dataIndex: "name",
      key: "name",
      fixed: "center",
    },

    {
      width: 50,
      title: "Segregate column",
      dataIndex: "column",
      key: "column",
      fixed: "center",
      render: (record, i) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <DropdownElement>
            <Select
              style={{ width: 250 }}
              onChange={handleDropdownChange}
              onClick={() => handleColumn(record)}
              placeholder="Choose Column"
            >
              {data &&
                data[i.key] &&
                data[i.key].length > 0 &&
                data[i.key].map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
            </Select>
          </DropdownElement>
        </div>
      ),
    },
    {
      key: "operation",
      width: 20,
      render: (record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <span style={{ cursor: "pointer" }}>
            <EditFilled disabled={loading} />
          </span>
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

  useEffect(() => {
    setLoading(true);
    const pay = {
      datasource_id: JSON.stringify(
        location.state.id ? location.state.id : location.state.response_id
      ),
      source_type: location.state.source_type,
    };
    Axios.post(url, pay)
      .then((res) => {
        setLoading(false);
        const data = [];
        location.state.source_id = params.responseid;
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
  }, [location.state, url, params, currentSource]);
  useEffect(() => {
    const newArr = [];
    // send all datasets for perstitence and mark selected ones
    tableData.forEach((e) => {
      newArr.push({
        type: "table",
        dataset_name: e.key,
        description: e.key,
        selected: selectedRowKeys.includes(e.key),
        seggregate_column: dropdownname,
      });
    });
    setPayloadData(newArr);
  }, [selectedRowKeys, tableData, dropdownname]);

  const reportMartSaveHandler = () => {
    if (isModalVisible) {
      Axios.post(reportMart, null, {
        headers: {
          datasource_id: location.state.response_id
            ? location.state.response_id
            : location.state.id,
          reportmart_name: name,
          period: period,
          standard_deviation: standardDeviation,
          periodicity: dropdownPeriod,
        },
      })
        .then((res) => {
          setDropDown(!dropDown);
          setIsModalVisible(false);
          message.info("Report mart saved successfully");
        })
        .catch((err) => {
          message.info("Something went wrong");
        });
    }
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handlePeriod = (e) => {
    setPeriod(e.target.value);
  };
  const handleDropdownPeriod = (value) => {
    setDropdownPeriod(value);
  };

  const handleStandardDeviation = (e) => {
    setStandardDeviation(e.target.value);
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
    if (!payload.length && !textArea) {
      setScreenLoading(false);
      message.info("please select at least one item");
    } else if (!itemReportMartId) {
      setScreenLoading(false);
      message.info("please choose reporting mart");
    } else if (dropdownname === " ") {
      setScreenLoading(false);
      message.info(
        "please check report mart and choose reporting mart using edit"
      );
    } else {
      setBtnLoading(!btnloading);
      newArr.push({
        type: "query",
        dataset_name: inputName,
        description: inputQuery ? inputQuery : "",
      });
      Axios.post(
        datasetUrl,
        textArea ? newArr : payload,

        {
          headers: {
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
            Axios.post(
              expectationURL,
              {
                dataset_ids: response.data.datasets_response_id,
                report_mart_id: itemReportMartId,
                datasource_id: location.state.source_id,
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
                const data = res.data;
                if (data.result && Object.keys(data.result).length > 0) {
                  const expeData =
                    data &&
                    data.result[response.data.datasets_response_id[0]]
                      .expectations;

                  dispatch(addExpectationData(expeData));

                  // TODO fix this hard code res.data.result[response.data.datasets_response_id[0]]
                  navigate(
                    "/configuration/datasource/martdetails/tablechecks",
                    {
                      state: {
                        expectationsData:
                          response.data.datasets_response_id.map(
                            (id) => res.data.result[id]
                          ),
                        expectations:
                          res.data &&
                          res.data.result[response.data.datasets_response_id[0]]
                            .expectations,
                        reportmart_id: res.data && res.data.report_mart_id,
                        dataset_ids: response.data.datasets_response_id,
                        data_source_id: params.responseid,
                        selectedDropdownName: dropdownname,
                      },
                    }
                  );

                  message.success("Schema information fetched Successfully!");
                } else {
                  message.warn("No data found in the selected report mart");
                }
              })
              .catch((err) => {
                setBtnLoading(false);
                setScreenLoading(false);
                notification.error({
                  message:
                    err.message === "Request failed with status code 500"
                      ? "500"
                      : "Error",
                  description:
                    err.message === "Request failed with status code 500"
                      ? "Internal Server Error"
                      : err.message,
                });
              });
          })
          .catch((err) => {
            message.info("Something went wrong");
          });
      });
    }
  };

  const reportMartSelectHandler = (value, option) => {
    if (value === "+ Create Reporting Mart") {
      setIsModalVisible(true);
    } else {
      setSelectedDropdown(value);
      setItemReportMartId(option.key);
    }
  };

  const handleDropdownChange = (value) => {
    setDropdownName(value);
  };

  return (
    <Tableview style={{ marginLeft: loading ? "0" : "100px" }}>
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
            <Spin
              className="spin"
              tip="Fetching Schema info..."
              spinning={screenLoading}
            >
              {textArea ? (
                <QueryTable
                  inputQuery={inputQuery}
                  setInputQuery={setInputQuery}
                  setInputName={setInputName}
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
                onChange={reportMartSelectHandler}
                placeholder="Choose Reporting Mart"
              >
                <Option value="+ Create Reporting Mart">
                  + Create Reporting Mart
                </Option>
                {menuItems &&
                  menuItems.length > 0 &&
                  menuItems.map(
                    (item) =>
                      item.name && (
                        <Option key={item.id} value={item.name}>
                          {item.name}
                        </Option>
                      )
                  )}
              </Select>
            </DropdownElement>
            <ButtonPosition>
              <Button
                type="primary"
                loading={btnloading}
                onClick={() => handleClick()}
              >
                {textArea ? "Create Custom Dataset" : "Add Tables"}
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
          handleOk={reportMartSaveHandler}
          handleCancel={handleCancel}
          OkText="Create"
          width="461.15px"
          title={"Reporting Mart Details"}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Reporting Mart Name"
              style={{ fontWeight: "medium" }}
            >
              <Input
                onChange={(e) => handleChange(e)}
                id="name"
                value={name}
                type="text"
                placeholder="Please enter Name here"
              />
            </Form.Item>
            <Form.Item
              label="Reporting Mart Period"
              style={{ fontWeight: "medium" }}
            >
              <Input
                onChange={(e) => handlePeriod(e)}
                id="period"
                value={period}
                type="number"
                placeholder="Please enter Period here"
              />
            </Form.Item>
            <Form.Item
              label="Standard Deviation"
              style={{ fontWeight: "medium" }}
            >
              <Input
                onChange={(e) => handleStandardDeviation(e)}
                id="standardDeviation"
                value={standardDeviation}
                type="number"
                placeholder="Please enter Standard deviation here"
              />
            </Form.Item>

            <Form.Item
              label="Segregation - Periodicity"
              style={{ fontWeight: "medium" }}
            >
              <Select
                id="dropdownperiod"
                value={dropdownPeriod || "month"}
                onChange={handleDropdownPeriod}
                placeholder="Please Choose the Period"
              >
                <Option key={"month"} value="month">
                  month
                </Option>
                <Option key={"week"} value="week">
                  week
                </Option>
                <Option key={"day"} value="day">
                  day
                </Option>
              </Select>
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
const ButtonPosition = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  width: 100%;
`;

const DropdownElement = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: flex-start;
  width: 100%;
  font-weight: lighter;
`;

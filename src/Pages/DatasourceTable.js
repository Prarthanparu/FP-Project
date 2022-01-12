import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  SearchOutlined,
  FilterOutlined,
  TableOutlined,
  EyeInvisibleFilled,
  EditFilled,
  DownOutlined,
} from "@ant-design/icons";
import { Input, DatePicker, Checkbox, Table, message, Spin, Form } from "antd";
import SelectedDatasourceCard from "../Components/SelectedDatasourceCard";
import { Button, Menu, Dropdown } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { dataSourceTypes } from "../Components/dataSourceTypes";
import Axios from "axios";
import ModalComponent from "../Components/Modal";

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
  const [payload, setPayloadData] = useState({});
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [btnloading, setBtnLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [itemReportMartId, setItemReportMartId] = useState();
  const [datasourceId, setDataSetId] = useState();
  const [dropDown, setDropDown] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("");

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

  function handleMenuClick(e) {
    message.success("Report Mart Selected Successfully!");
  }
  const handleOk = () => {
    Axios.post(
      datasetUrl,
      payload,

      {
        headers: {
          dataset_name: "Dummy Data",
          type: "dataset",
          source_id: params.responseid,
        },
      }
    )
      .then((res) => {
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
      id: location.state.response_id,
      reportmart_name: "testing",
    })
      .then((res) => {
        console.log(res.data);
        if (Array.isArray(res.data)) {
          setMenuItems(res.data);
        } else {
          setMenuItems([]);
        }
      })
      .catch(() => {});
  }, [dropDown]);

  const dropdown = (e) => {
    Axios.put(reportMart, null, {
      headers: {
        datasource_id: location.state.response_id,
        reportmart_id: e,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(menuItems);
  console.log(menuItems && menuItems.length);
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item onClick={() => setIsModalVisible(true)}>
        {" "}
        + Create Reporting Mart
      </Menu.Item>
      {menuItems &&
        menuItems.length > 0 &&
        menuItems.map((item) => (
          <Menu.Item
            onClick={(e) => {
              setSelectedDropdown(item.name);
              dropdown(item.id);
              setItemReportMartId(item.id);
            }}
            key={item.id}
          >
            {item.name}
          </Menu.Item>
        ))}
    </Menu>
  );

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
      setScreenLoading(false);
      message.info("please select at least one item");
    } else {
      setBtnLoading(!btnloading);

      Axios.post(
        datasetUrl,
        payload,

        {
          headers: {
            dataset_name: "Dummy Data",
            type: "dataset",
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
            setDataSetId(response.data.datasets_response_id);
            Axios.post(
              expectationURL,
              {
                ids: [itemReportMartId],
              },
              {
                headers: {
                  type: "reportmart",
                  // type: response.data.type,
                },
              }
            )
              .then((res) => {
                console.log(res);
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

  return (
    <Tableview style={{ marginLeft: loading ? "0" : "200px" }}>
      {!loading ? (
        <React.Fragment>
          <CardComponent>
            <SelectedDatasourceCard currentSource={currentSource} />
            <Button>
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
            <DropdownElement>
              <Dropdown overlay={menu}>
                <Button>
                  Choose Reporting Mart <DownOutlined />
                </Button>
              </Dropdown>
            </DropdownElement>

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

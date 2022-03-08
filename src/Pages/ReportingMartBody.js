import React, { useState } from "react";
import {
  EyeOutlined,
  EditOutlined,
  FundViewOutlined,
  PlayCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Axios from "axios";
import moment from "moment";
import Iframe from "react-iframe";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Table,
  message,
  Spin,
  notification,
  Space,
  Modal,
  Select,
  Form,
  DatePicker,
} from "antd";
import ModalComponent from "../Components/Modal";
const { Option } = Select;
const ReportingMartBody = ({ suiteData }) => {
  const proxy = process.env.REACT_APP_PROXY;
  const visualizationUrl = proxy + "/api/visualization";
  const expectationURL = proxy + "/api/expectationsuite";
  const reportmartQualityChecks = proxy + "/api/reportmart_quality_checks";

  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reportMartData, setReportMartData] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [dataDocLocation, setDataDocLocation] = useState("");
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("6");
  const [martId, setMartId] = useState(moment().format("DD-MM-YYYY"));
  const [refresh, setRefresh] = useState(false);

  const [screenLoading, setScreenLoading] = useState(false);

  const handleCreat = () => {
    if (date) {
      setScreenLoading(true);
      Axios.post(
        expectationURL,
        {
          report_mart_id: martId,
          period,
          date: moment(date).format("YYYY-MM-DD"),
          refresh: refresh
        },
        {
          headers: {
            type: "fullmart",
          },
        }
      )
        .then((res) => {
          console.log(res);
          setScreenLoading(false);
          setIsModalVisible(false);
          message.success(
            "Quality checks has been performed successfully on reporting mart"
          );
          setIsModalVisible(false);
          navigate("/configuration/reportmart/refresh");
        })
        .catch((err) => {
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
    }
  };

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
      dataIndex: "report_mart_id",
      key: "report_mart_id",
      render: (reportMartId) => (
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <section>
            <PlayCircleOutlined
              title="Execute"
              style={{ fontSize: "20px" }}
              onClick={(e) => {
                setRefresh(false);
                setIsModalVisible(true);
                setMartId(reportMartId);
              }}
            />
          </section>
          <section>
            <ReloadOutlined
              title="Refresh Report Mart"
              style={{ fontSize: "20px" }}
              onClick={(e) => {
                setIsModalVisible(true);
                setMartId(reportMartId);
                setRefresh(true);
              }}
            />
          </section>
          <span>
            <EditOutlined style={{ fontSize: "20px" }} />
          </span>
          <span>
            <EyeOutlined style={{ fontSize: "20px" }} />
          </span>
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

  const handleShowReport = (mart, suit) => {
    const execution_id = suit.id;
    const report_mart_id = mart.report_mart_id;
    console.log(execution_id, report_mart_id);
    navigate(`/configuration/reportmart/detailedview`, {
      state: { execution_id, report_mart_id },
    });
  };

  const expandedRowRender = (mart) => {
    const columns = [
      {
        title: "Processed Date",
        dataIndex: "processed_date",
        key: "processed_date",
        render: (record) => moment(record).format("YYYY-DD-MMMM"),
      },
      {
        title: "Execution Start Time",
        dataIndex: "start_time",
        key: "start_time",
        render: (record) =>
          moment(record).local().format("YYYY-DD-MMMM HH:mm:ss"),
      },
      {
        title: "Execution End Time",
        dataIndex: "end_time",
        key: "end_time",
        render: (record) =>
          moment(record).local().format("YYYY-DD-MMMM HH:mm:ss"),
      },
      { title: "Pass", dataIndex: "no_of_passed", key: "no_of_passed" },
      { title: "Fail", dataIndex: "no_of_failed", key: "no_of_failed" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (record) => (
          <p
            style={{
              color:
                record === "Failed"
                  ? "red"
                  : record === "Passed"
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
        dataIndex: "datadoc_location",
        key: "datadoc_location",
        render: (record, suit) => (
          <div style={{ display: "flex", flexDirection: "row", gap: 30 }}>
            <Space
              size="middle"
              id={{ record }}
              onClick={(e) => {
                setDataDocLocation(record);
                setShowReport(true);
              }}
            >
              <EyeOutlined
                title="View Docs"
                style={{ fontSize: "20px", cursor: "pointer" }}
              />
            </Space>
            <Space size="middle">
              <FundViewOutlined
                onClick={() => handleShowReport(mart, suit)}
                title="View Details"
                style={{ fontSize: "20px", cursor: "pointer" }}
              />
            </Space>
          </div>
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
        <a href="">Report mart Checks</a>
      </WrapperHeader>
      <Spin
        className="spin"
        tip="Profiling in progress..."
        spinning={screenLoading}
      >
        <Table
          className="components-table-demo-nested"
          columns={columns}
          expandable={{ expandedRowRender }}
          onExpand={(expanded, record) => handleExpend(expanded, record)}
          rowKey={(record) => record.report_mart_id}
          dataSource={suiteData}
          expandedRowKeys={expandedRowKeys}
          style={{ width: "99%" }}
          scroll={{ y: 500 }}
        />
      </Spin>
      <Modal
        title="Data Docs"
        centered
        visible={showReport}
        onOk={() => setShowReport(false)}
        onCancel={() => setShowReport(false)}
        width={1400}
      >
        <Iframe
          src={dataDocLocation}
          width="100%"
          height="1000px"
          id="myId"
          display="initial"
          position="relative"
        />
      </Modal>
      {isModalVisible && (
        <ModalComponent
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          OkText="Create"
          width="461.15px"
          handleOk={() => handleCreat()}
          handleCancel={() => setIsModalVisible(false)}
        >
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
            <Form.Item label="Select Date">
              <StyledDatePicker onChange={(e) => setDate(e._d)} />
            </Form.Item>
            <Form.Item label="Select Period">
              <Select defaultValue={period} onChange={(e) => setPeriod(e)}>
                <Option value="6">6 Months</Option>
                <Option value="12">12 Months</Option>
              </Select>
            </Form.Item>
          </Form>
        </ModalComponent>
      )}
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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

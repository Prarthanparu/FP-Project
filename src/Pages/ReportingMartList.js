import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Checkbox, Upload, Table, Button } from "antd";
import { useParams } from "react-router-dom";
import {
  EditOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Image from "../images/empty.png";
import moment from "moment";

const ReportingMartList = () => {
  const params = useParams();
  const [dataSet, setDataSet] = useState();
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const url = "http://0a78-223-196-162-114.ngrok.io/api/report_mart";
  const datasourceUrl = "http://0a78-223-196-162-114.ngrok.io/api/datasource";
  const postDatasourceUrl =
    "http://0a78-223-196-162-114.ngrok.io/api/report_mart";

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          report_mart_id: 1,
        },
      })
      .then((res) => {
        setDataSet(res.data);
      });
  }, [params]);
  useEffect(() => {
    axios
      .get(datasourceUrl)
      .then((res) => {
        const data = [];
        res.data &&
          res.data.forEach((e) => {
            data.push({
              key: JSON.stringify(e.id),
              name: e.name,
              created_on: e.created_on,
              created_user: e.created_user,
              dataset_details: e.dataset_details,
              source_type: e.source_type,
            });
          });
        setTableData(data);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Created Date",
      dataIndex: "created_on",
      key: "created_on",
      render: (record) => moment(record).format("YYYY-DD-MMMM"),
    },
    {
      title: "Total Datasets",
      dataIndex: "datasets_count",
      key: "datasets_count",
      render: (record) =>
        `${
          record === 0
            ? record + " DataSets"
            : record === 1
            ? record + " DataSet Selected"
            : record + " DataSets Selected"
        } `,
    },
    {
      title: "Source Type",
      dataIndex: "source_type",
      key: "source_type",
    },
  ];
  function onSelectChange(selectedRowKeys) {
    setSelectedRowKeys(selectedRowKeys);
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const AddDatasource = () => {
    axios
      .post(postDatasourceUrl, {
        id: selectedRowKeys,
        reportmart_name: "tablessss",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <CardContent>
      <ListContent>
        <Checkbox onChange={onChange} />
        <Card className="customContent" style={{}}>
          <p>
            <span>
              {dataSet} <EditOutlined className="icon" />
            </span>
            <p>
              <span style={{ marginRight: "30px" }}>
                <DownloadOutlined />
                <span className="btn">Download</span>
              </span>
              <Upload>
                <UploadOutlined />
                <span className="btn">Upload</span>
              </Upload>
            </p>
          </p>
        </Card>
      </ListContent>

      <Card className="customCard">
        <ListView>
          {tableData && tableData.length ? (
            <Table
              style={{ width: "100%", height: "100%" }}
              scroll={{ x: 1500, y: 400 }}
              rowSelection={rowSelection}
              columns={columns}
              dataSource={tableData}
              pagination={false}
            />
          ) : (
            <>
              <img src={Image} />
              <p>The Mart is Empty add new Connections.</p>
            </>
          )}
        </ListView>
        <p style={{ float: "right" }}>
          <Button
            style={{ marginTop: "10px", border: 0, padding: 0 }}
            onClick={() => AddDatasource()}
          >
            + Add Custom Datasources
          </Button>
        </p>
      </Card>
    </CardContent>
  );
};
export default ReportingMartList;

const CardContent = styled.section`
  width: 100%;
  .customContent {
    width: 100%;
    height: 50px;
    border: 1px solid #000000;
    background: #272728;
    margin-bottom: 10px;
    .ant-card-body {
      padding: 14px !important;
    }
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;
      margin: 0;
    }
    .icon {
      margin-left: 6px;
    }
    .btn {
      margin-left: 10px;
      font-weight: normal;
    }
  }
  .customCard {
    width: 100%;
    border: 1px dashed #545454;
    background: #1f2021;
    height: 534px;
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-card-body {
      width: 100%;
    }
  }
`;
const ListView = styled.div`
  text-align: center;
  img {
    margin-bottom: 16px;
  }

  p {
    color: #545454;
  }
`;
const ListContent = styled.div`
  display: flex;
  align-items: center;
  label {
    margin-right: 16px;
  }
`;

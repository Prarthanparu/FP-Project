import React, { useState, useEffect } from "react";
import { Tabs, Button, Table, Spin } from "antd";
import styled from "styled-components";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import moment from "moment";

function DatasourceMartDetails() {
  const { state } = useLocation();
  const [tableList, setTableList] = useState([]);
  const [martList, setMartList] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const proxy = process.env.REACT_APP_PROXY;
  const datasourceUrl = proxy + "/api/datasource";

  Axios.get(datasourceUrl)
    .then((res) => {
      setLoading(false);
      setTableList(res.data);
    })
    .catch(() => {
      setLoading(false);
    });

  const handleClick = () => {
    navigate(
      "/configuration/datasource/martdetails/qualitychecks/tablechecks",
      { state: state }
    );
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
    {
      title: "Actions",
      key: "",
      dataIndex: "",
      render: (record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 60,
            justifyContent: "flex-start",
          }}
        >
          <a onClick={() => handleEdit(record)}>
            <EditOutlined />
          </a>
          <a>
            <DeleteOutlined />
          </a>
        </div>
      ),
    },
  ];
  const handleEdit = (e) => {
    navigate("/configuration/" + e.id + "/datasourcetable/" + e.id, {
      state: e,
    });
  };
  return (
    <MartBody>
      <a>Available DataSources</a>
      {!loading ? (
        <>
          <MartContent>
            <CardView>
              <Table
                style={{ width: "100%", height: "100%" }}
                scroll={{ x: 1500, y: 400 }}
                columns={columns}
                dataSource={tableList}
                pagination={false}
              />
            </CardView>
          </MartContent>
          <ButtonContent>
            <Link to="/">
              {" "}
              <Button type="primary">Add New Connections</Button>
            </Link>
            <Button onClick={() => handleClick()}>Define Checks</Button>
          </ButtonContent>
        </>
      ) : (
        <Spin className="loading" />
      )}
    </MartBody>
  );
}
export default DatasourceMartDetails;

const MartBody = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  flex-direction: column;
  gap: 40px;
  .loading {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  > a {
    font-size: 25px;
    font-weight: bold;
  }
`;

const MartContent = styled.div`
  display: flex;
  width: 100%;
  .customTab {
    margin-left: 100px;
    width: 100%;
    .ant-tabs-tab {
      margin-right: 10px;
    }
    .ant-tabs-nav::before {
      display: none !important;
    }
  }
`;
const CardView = styled.div`
  display: flex;
  flex-direction: row;
  gap: 90px;
  align-items: flex-start;
  justify-content: start;
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: revert;
`;
const CardComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const ButtonContent = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const SelectedTables = styled.div`
  display: flex;
  width: 800px;
  height: 50vh;
  flex-direction: column;
  overflow: auto;
  :first-child {
    margin-top: 0px !important;
  }
  .customContent {
    width: 80%;
    height: 50px;
    margin-top: 10px;
    .ant-card-body {
      padding: 14px !important;
    }
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  customContent:first-child {
    margin-top: 0px !important;
  }
`;
const AddView = styled.div`
  text-align: center;
  display: flex;
  .customButton {
    background: linear-gradient(123.32deg, #db5e1d 45.17%, #ef3499 100%);
    box-shadow: 3px 2px 6px #000000;
  }
`;

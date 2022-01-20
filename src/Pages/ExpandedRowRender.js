import React, { useState, useEffect } from "react";
import { Table, Menu, Space } from "antd";
import { FolderViewOutlined, EditOutlined } from "@ant-design/icons";
import Axios from "axios";

const ExpandedRowRender = (props) => {
  const proxy = process.env.REACT_APP_PROXY;
  const visualizationUrl = proxy + "/api/visualization";
  const [visualizations, setVisualizations] = useState([]);
  const [loadinig, setLoading] = useState(true);

  useEffect( () => {
    async function fetchData() {
      await Axios.get(visualizationUrl, {
        headers: {
          report_mart_id: props.report_mart_id
        }
      }).then((res) => {
          let data = [];
          console.log(res);
          res.data.output.forEach((element) => {
            data.push({
              key: element.id,
              processeddata: element.processed_date,
              executionStartTime: element.start_time,
              executionEndTime: element.end_time,
              pass: element.no_of_passed,
              fail: element.no_of_failed,
              status: element.status,
            });
          });
          setVisualizations(data);
          setLoading(false);
        }).catch((e) => {console.log(e); });
    }

    fetchData();
    
    // Always keep empty array in the end of useEffect for initializing
  }, []);

  const columns = [
    {
      title: "Processed Data",
      dataIndex: "processeddata",
      key: "processedData",
    },
    {
      title: "Execution Start Time",
      dataIndex: "executionStartTime",
      key: "executionStartTime",
    },
    {
      title: "Execution End Time",
      dataIndex: "executionEndTime",
      key: "executionEndTime",
    },
    { title: "Pass", dataIndex: "pass", key: "pass" },
    { title: "Fail", dataIndex: "fail", key: "fail" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (record) => (
        <p
          style={{
            color:
              record === "review"
                ? "red"
                : record === "Approved"
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
      dataIndex: "",
      key: "",
      render: () => (
        <Space size="middle">
          <FolderViewOutlined />
        </Space>
      ),
    },
  ];

  if(loadinig){
    return(
      <div></div>
    )
  }

  return (
    <Table
      columns={columns}
      dataSource={visualizations}
      pagination={false}
      className="innerTable"
    />
  );
};

export default ExpandedRowRender;
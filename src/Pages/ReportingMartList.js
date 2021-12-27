import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card, Checkbox, Upload } from "antd";
import { useParams } from "react-router-dom";
import {
  EditOutlined,
  DownloadOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Image from "../images/empty.png";

const ReportingMartList = () => {
  const params = useParams();
  const [dataSet, setDataSet] = useState();
  const url = "http://37ad-175-101-108-122.ngrok.io/api/report_mart";
 
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
  const data = ["datasource", "datasets"];
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <CardContent>
      {/* {data &&
        data.map((item) => ( */}
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
      {/* ))} */}
      <Card className="customCard">
        <ListView>
          <img src={Image} />
          <p>The Mart is Empty add new Connections.</p>
        </ListView>
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

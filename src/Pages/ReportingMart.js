import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Button, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalComponent from "../Components/Modal";
import ReportMartBody from "./ReportingMartBody";
import Axios from "axios";
import { useLocation } from "react-router-dom";


const ReportingMart = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");

  const [form] = Form.useForm();
  const proxy = process.env.REACT_APP_PROXY;
  const datasetUrl = proxy + "/api/datasetdetails";
  const reportMartUrl = proxy + "/api/report_mart";

  const [reportMarts, setReportMarts] = useState([]);
  const { state } = useLocation();

  useEffect(() => {

    Axios.get(reportMartUrl)
      .then((res) => {
        console.log(res);
        setReportMarts(res.data);
      })
      .catch(() => { });
    // Always keep empty array in the end of useEffect
  }, []);

  const handleOk = () => {
    // Axios.post(
    //   datasetUrl,
    //   payload,

    //   {
    //     headers: {
    //       dataset_name: "Dummy Data",
    //       type: "dataset",
    //       // source_id: params.responseid,
    //     },
    //   }
    // )
    //   .then((res) => {
    // Axios.post(reportMart, null, {
    //   headers: {
    //     // datasource_id: location.state.response_id,
    //     reportmart_name: name,
    //   },
    // }).then((res) => {
    //   //reportmart_name
    //   console.log(res);
    //   // setDropDown(!dropDown);
    // });
    // })
    // .catch((err) => {
    //   message.info("Something went wrong");
    // });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <CardContent>
      {reportMarts && reportMarts.length>0 ? (
        <ReportMartBody reportMarts= {reportMarts}/>
      ) : (
        <Card className="customCard">
          <AddView>
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              size="large"
              className="customButton"
              onClick={() => setIsModalVisible(true)}
            />
            <p>There is No Reporting Mart Data, Create One Here</p>
          </AddView>
        </Card>
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
    </CardContent>
  );
};
export default ReportingMart;

const CardContent = styled.section`
  width: 100%;
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
const AddView = styled.div`
  text-align: center;
  width: 274px;
  .customButton {
    background: linear-gradient(123.32deg, #db5e1d 45.17%, #ef3499 100%);
    box-shadow: 3px 2px 6px #000000;
    margin-bottom: 24px;
  }
`;

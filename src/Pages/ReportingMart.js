import React, { useState } from "react";
import styled from "styled-components";
import { Card, Button, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams, useLocation } from "react-router-dom";
import ModalComponent from "../Components/Modal";
import axios from "axios";

const ReportingMart = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const params = useParams();
  const { state } = useLocation();
  console.log({ state });
  const [form] = Form.useForm();
  const url = "http://0a78-223-196-162-114.ngrok.io/api/report_mart";
  const handleOk = () => {
    axios
      .post(
        url,
        {
          reportmart_name: name,
        },
        {
          headers: {
            datasource_id: params.responseid,
          },
        }
      )
      .then((res) => {
        console.log({ res });
        setIsModalVisible(false);
        props.setMartList(true);
      })
      .catch((err) => {
        console.log({ err });
        message.info("Something went wrong");
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };
  return (
    <CardContent>
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

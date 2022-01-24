import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Button, Form, Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalComponent from "../Components/Modal";
import ReportMartBody from "./ReportingMartBody";
import Axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const ReportingMart = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const proxy = process.env.REACT_APP_PROXY;
  const expectationsuiteUrl = proxy + "/api/expectationsuite";
  const reportMartUrl = proxy + "/api/report_mart";
  const [expectationsuites, setExpectationsuites] = useState([]);

  useEffect(() => {
    Axios.get(expectationsuiteUrl)
      .then((res) => {
        setExpectationsuites(res.data.output);
      })
      .catch(() => { });
    // Always keep empty array in the end of useEffect for initializing
  }, []);

  const handleOk = () => {
    Axios.post(reportMartUrl, null, {
      headers: {
        reportmart_name: name,
      },
    }).then((res) => {
      setIsModalVisible(false);
      navigate("/configuration/reportmart");
    }).catch((err) => {
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
      <AddView>

      </AddView>
      {expectationsuites && expectationsuites.length > 0 && (
        <ReportMartBody suiteData={expectationsuites} />
      )}
      <ButtonContent>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        title={'Add Report Mart'}
      >Add Report Mart</Button>
      </ButtonContent>
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
  text-align: right;
  .customButton {
    background: linear-gradient(123.32deg, #db5e1d 45.17%, #ef3499 100%);
    box-shadow: 3px 2px 6px #000000;
    margin-bottom: 24px;
  }
`;
const ButtonContent = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import Axios from "axios";

const Setting = () => {
  const [form] = Form.useForm();
  const proxy = process.env.REACT_APP_PROXY;
  const url = proxy + "/api/appconfiguration";

  useEffect(() => {
    Axios.get(url).then((res) => {
      console.log(res.data);
    });
  });
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 6 },
  };
  const data = {
    response: [
      {
        id: 1,
        attribute_name: "period",
        attribute_value: "12",
        active: 1,
      },
      {
        id: 2,
        attribute_name: "standard_deviation",
        attribute_value: "2",
        active: 1,
      },
    ],
  };
  return (
    <MainWrapper>
      <Header>
        <h1>Setting</h1>
      </Header>
      <Form {...formItemLayout} form={form} layout="horizontal">
        {data.response.map((e) => (
          <Form.Item label={e.attribute_name}>
            <Input placeholder={e.attribute_name} value={e.attribute_value} />
          </Form.Item>
        ))}
        <ButtonContent>
          <Button type="primary" >Submit</Button>
        </ButtonContent>
      </Form>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  width: 100%;
`;
const Header = styled.div`
  > h1 {
    font-weight: bold;
    font-size: 30px;
    letter-spacing: 0.05em;
    color: #ef7434;
  }
`;
const ButtonContent = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;

export default Setting;

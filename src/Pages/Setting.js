import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import styled from "styled-components";
import Axios from "axios";

const { Option } = Select;

const Settings = () => {
  const [form] = Form.useForm();
  const proxy = process.env.REACT_APP_PROXY;
  const url = proxy + "/api/appconfiguration";
  const [data, setData] = useState({});

  useEffect(() => {
    Axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [url]);

  const onFinish = () => {
    Axios.put(url, data.response).then((res) => {
      message.info("successfully updated");
    });
  };

  const onValueChange = (e) => {
    const newValue = data.response.find((x) => x.id === parseInt(e.target.id));
    newValue.attribute_value = e.target.value;
    const newData = data.response.map((x) =>
      x.id === parseInt(e.target.id) ? newValue : x
    );
    setData({ ...data, response: newData });
  };

  const onSelectValue = (id, value) => {
    const newValue = data.response.find((x) => x.id === parseInt(id));
    newValue.attribute_value = value;
    const newData = data.response.map((x) =>
      x.id === parseInt(id) ? newValue : x
    );
    setData({ ...data, response: newData });
  };


  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 6 },
  };
  return (
    <MainWrapper>
      <Header>
        <h1>Settings</h1>
      </Header>
      <Form {...formItemLayout} form={form} layout="horizontal">
        {data.response?.map((setting) => {
          return setting.attribute_type === "select" ? (
            <Form.Item label={setting.display_name}>
              <Select
                placeholder="Select periodicity"
                onChange={(value) => onSelectValue(setting.id, value)}
                defaultValue={setting.attribute_value}
              >
                {JSON.parse(setting.possible_values).map((x) => (
                  <Option value={x} key={x}>
                    {x}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <Form.Item label={setting.display_name}>
              <Input
                placeholder={setting.attribute_name}
                id={setting.id}
                value={setting.attribute_value}
                onChange={onValueChange}
                type={setting.attribute_type}
              />
            </Form.Item>
          );
        })}
        <ButtonContent>
          <Button type="primary" onClick={onFinish}>
            Submit
          </Button>
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

export default Settings;

import React, { useState } from "react";
import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import SelectedDatasourceCard from "../Components/SelectedDatasourceCard";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { dataSource } from "../Components/DatasourceCard";

function ConfigTable(props) {
  const [form] = Form.useForm();

  const params = useParams();
  const navigate = useNavigate();

  const url = "http://0a78-223-196-162-114.ngrok.io/api/datasource";

  const [data, setData] = useState({
    name: "",
    host: "",
    username: "",
    password: "",
    database: "",
    port: "",
  });
  const [loading, setLoading] = useState(false);

  let currentSource = dataSource.find(
    (eachSource) => eachSource.id === parseInt(params.id)
  );

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post(
      url,
      {
        id: currentSource.id,
        // sourceName: data.sourceName,
        host: data.host,
        username: data.username,
        port: data.port,
        password: data.password,
        database: data.database,
      },
      {
        headers: {
          source_type: currentSource.source_type,
          name: data.name,
        },
      }
    )
      .then((res) => {
        console.log({ res });
        setLoading(false);
        navigate(
          "/configuration/" +
            res.data.response_id +
            "/datasourcetable/" +
            res.data.response_id,
          { state: res.data }
        );
        message.info("Connection is established");
      })
      .catch((err) => {
        console.log({ err });
        setLoading(false);
        message.info("Something went wrong");
      });
  };

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }

  return (
    <ConfigBody>
      <SelectedDatasourceCard currentSource={currentSource} />

      <TableContent>
        <h1>Select SourceData Deatils </h1>
        <p>
          Fill in the Configuration’s
          <span>
            <InfoCircleOutlined style={{ marginLeft: 5, fontSize: 12 }} />
          </span>
        </p>
        <SearchBarContent>
          <Form form={form} layout="vertical">
            <Form.Item label="Name" required>
              <Input
                onChange={(e) => handle(e)}
                id="name"
                value={data.name}
                type="text"
                style={{ width: 450, height: 41 }}
                placeholder="input placeholder"
              />
            </Form.Item>
            <Form.Item label="Host" required>
              <Input
                onChange={(e) => handle(e)}
                id="host"
                value={data.host}
                type="value"
                style={{ width: 450, height: 41 }}
                placeholder="input placeholder"
              />
            </Form.Item>
            <Form.Item label="Port" required>
              <Input
                onChange={(e) => handle(e)}
                id="port"
                value={data.port}
                type="value"
                style={{ width: 450, height: 41 }}
                placeholder="input placeholder"
              />
            </Form.Item>
            <Form.Item label="User" required>
              <Input
                onChange={(e) => handle(e)}
                id="username"
                value={data.username}
                type="text"
                style={{ width: 450, height: 41 }}
                placeholder="input placeholder"
              />
            </Form.Item>
            <Form.Item label="Password" required>
              <Input
                onChange={(e) => handle(e)}
                id="password"
                value={data.password}
                type="password"
                style={{ width: 450, height: 41 }}
                placeholder="input placeholder"
              />
            </Form.Item>
            <Form.Item label="DataBase Name">
              <Input
                onChange={(e) => handle(e)}
                id="database"
                value={data.database}
                type="text"
                style={{ width: 450, height: 41 }}
                placeholder="input placeholder"
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                onClick={(e) => {
                  submit(e);
                }}
                type="primary"
              >
                Create Connections
              </Button>
            </Form.Item>
          </Form>
        </SearchBarContent>
      </TableContent>
    </ConfigBody>
  );
}

export default ConfigTable;

const ConfigBody = styled.div`
  display: flex;

  width: 100%;

  flex-direction: row;
  gap: 50px;
  justify-content: center;
`;

const TableContent = styled.div`
  display: flex;
  flex-direction: column;

  > h1 {
    font-weight: bold;
    font-size: 30px;
    align-items: center;
    letter-spacing: 0.05em;
    line-height: 37px;
    color: #ef7434;
    text-align: center;
  }
  > p {
    font-size: 18px;
    font-weight: 500;
    align-items: center;
    letter-spacing: 0.05em;
    line-height: 37px;
    text-align: center;
  }
`;

const SearchBarContent = styled.div`
  display: flex;
  text-align: right;
  width: 100%;
  justify-content: center;
`;

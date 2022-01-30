import React, { useState } from "react";
import styled from "styled-components";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import SelectedDatasourceCard from "../Components/SelectedDatasourceCard";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { dataSourceTypes } from "../Components/dataSourceTypes";

function ConfigTable(props) {
  const [form] = Form.useForm();

  const params = useParams();
  const navigate = useNavigate();
  const proxy = process.env.REACT_APP_PROXY;
  const url = proxy + "/api/datasource";

  const [data, setData] = useState({
    name: "",
    host: "",
    username: "",
    password: "",
    database: "",
    port: "",
    schema: "",
    warehouse: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  let currentSource = dataSourceTypes.find(
    (eachSource) => eachSource.id === parseInt(params.id)
  );
  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post(
      url,
      params.id === "2"
        ? {
            id: currentSource.id,
            host: data.host,
            username: data.username,
            port: data.port,
            password: data.password,
            database: data.database,
            schema: data.schema,
            warehouse: data.warehouse,
            role: data.role,
          }
        : {
            id: currentSource.id,
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
          <Form
            form={form}
            layout="vertical"
            className={params.id === "2" ? "scroll" : ""}
          >
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
            {params.id === "2" ? (
              <>
                <Form.Item label="Schema">
                  <Input
                    onChange={(e) => handle(e)}
                    id="schema"
                    value={data.schema}
                    type="text"
                    style={{ width: 450, height: 41 }}
                    placeholder="input placeholder"
                  />
                </Form.Item>
                <Form.Item label="Warehouse">
                  <Input
                    onChange={(e) => handle(e)}
                    id="warehouse"
                    value={data.warehouse}
                    type="text"
                    style={{ width: 450, height: 41 }}
                    placeholder="input placeholder"
                  />
                </Form.Item>
                <Form.Item label="Role">
                  <Input
                    onChange={(e) => handle(e)}
                    id="role"
                    value={data.role}
                    type="text"
                    style={{ width: 450, height: 41 }}
                    placeholder="input placeholder"
                  />
                </Form.Item>
              </>
            ) : null}
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
  .scroll {
    height: 40rem;
    overflow-y: scroll;
  }

  .scroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  .scroll::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  .scroll::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 10px;
    background-image: -webkit-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.2) 75%,
      transparent 75%,
      transparent
    );
  }
`;

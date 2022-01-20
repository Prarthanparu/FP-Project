import React, { useState } from "react";
import styled from "styled-components";
import { Input } from "antd";

function QueryTable(props) {
  const { TextArea } = Input;

  const onChange = (e) => {
    props.setInputQuery(e.target.value);
  };
  const onChangeName = (e) => {
    props.setInputName(e.target.value);
  };

  return (
    <QueryBody>
      <QueryInput>
        <Input
          id="name"
          type="text"
          style={{ width: 450, height: 41 }}
          placeholder="Enter Dataset Name"
          onChange={onChangeName}
        />
      </QueryInput>
      <TextArea
        showCount
        maxLength={100}
        placeholder="Enter your query here"
        onChange={onChange}
        style={{
          width: "100%",
          height: 400,
          backgroundColor: "black",
        }}
      />
    </QueryBody>
  );
}

export default QueryTable;

const QueryBody = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  height: 400px;
  flex-direction: column;
  padding-top: 40px;
`;

const QueryInput = styled.div``;

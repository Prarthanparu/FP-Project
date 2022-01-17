import React from "react";
import styled from "styled-components";
import { Input } from "antd";

function QueryTable(props) {
  const { TextArea } = Input;

  const onChange = (e) => {
    props.setInputQuery(e.target.value);
  };

  return (
    <QueryBody>
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
<<<<<<< HEAD
  height: 400px;
=======
>>>>>>> db01bb4f120e89ec1aed3f2b8079b629e14970dd
  flex-direction: column;
  padding-top: 40px;
`;

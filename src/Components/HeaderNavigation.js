import React, { useState } from "react";
import styled from "styled-components";
import { Steps } from "antd";

function HeaderNavigation() {
  const { Step } = Steps;
  const steps = [
    {
      title: "Select DataSource",
      content: "First-content",
    },
    {
      title: "Select DataSource Details",
      content: "Second-content",
    },
    {
      title: "Table View",
      content: "Last-content",
    },
    {
      title: "Define Quality Checks",
      content: "Last-content",
    },
  ];

  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <LandingPage>
      <Previous>
        <div>
          {current < steps.length - 1 && (
            <a href="#" type="primary" onClick={() => next()}>
              Next
            </a>
          )}
        </div>
      </Previous>
      <Content>
        <Steps size="small" current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {/* <div className="steps-content">{steps[current].content}</div> */}
        {/* you can Load the pages accordingly with the steps */}
      </Content>
      <Close>
        <div className="steps-action">
          {current > 0 && (
            <a href="#" style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </a>
          )}
        </div>
      </Close>
    </LandingPage>
  );
}

export default HeaderNavigation;

const LandingPage = styled.div`
  margin-left: 156px;
  display: flex;
  padding: 10px;
  align-items: center;
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.55);
`;

const Previous = styled.div`
  flex: 0.2;
  text-align: left;
  margin-left: 20px;
`;

const Content = styled.div`
  flex: 0.6;
  text-align: center;
  margin-top: 10px;
`;

const Close = styled.div`
  flex: 0.2;
  text-align: right;
  margin-right: 20px;
`;

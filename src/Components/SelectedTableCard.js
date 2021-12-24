import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
// import Image from "/images/Frame 2.png";

function SelectedDatasourceCard() {
  return (
    <CardContent>
      <Card hoverable style={{ width: 177, height: 247 }}>
        <ImageContainer>{/* <img src={Image} /> */}</ImageContainer>
        <ImageDetails>
          <h1>Table Name</h1>

          <p>
            Selected <br />
            Table{" "}
            <CheckCircleFilled style={{ fontSize: 20, color: "#2DC033" }} />
          </p>
          <h6>
            <a href="">Click Here</a> to change Table
          </h6>
        </ImageDetails>
      </Card>
    </CardContent>
  );
}

export default SelectedDatasourceCard;

const CardContent = styled.section`
  display: flex;
  align-items: center;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ImageDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  > h1 {
    font-weight: bold;
    font-size: 16px;
    line-height: 20px;
    align-items: center;
    text-align: center;
    letter-spacing: 0.05em;
  }
  > p {
    font-weight: 200;
    font-size: 12px;
    line-height: 17px;
  }
`;

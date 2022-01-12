import React from "react";
import { Card } from "antd";
import styled from "styled-components";
import { Col } from "antd";
import { useNavigate } from "react-router-dom";
import { dataSourceTypes } from "./dataSourceTypes";

function Datasources(props) {
  const { currentSource } = props;
  const navigate = useNavigate();

  function handleClick(id) {
    navigate("/configuration/" + id);
  }
  return (
    <>
      {currentSource && currentSource ? (
        <Col span={8}>
          <ImageContainer>
            <img
              src={currentSource && currentSource.img}
              alt={currentSource && currentSource.title}
            />
          </ImageContainer>
          <ImageTitle>
            <p>{currentSource.title}</p>
          </ImageTitle>
        </Col>
      ) : (
        <>
          {dataSourceTypes.map((data) => {
            return (
              <Col span={8} key={data.id}>
                <Card
                  id={data.id}
                  onClick={(e) => handleClick(data.id)}
                  hoverable
                >
                  <ImageContainer>
                    <img
                      src={data.img}
                      alt={currentSource && currentSource.title}
                    ></img>
                  </ImageContainer>
                  <ImageTitle>
                    <p>{data.title}</p>
                  </ImageTitle>
                </Card>
              </Col>
            );
          })}
        </>
      )}
    </>
  );
}

export default Datasources;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ImageTitle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  > p {
    align-items: center;
  }
`;

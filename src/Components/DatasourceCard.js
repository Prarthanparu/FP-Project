import React from "react";
import { Card } from "antd";
import styled from "styled-components";
import { Col } from "antd";
import { useNavigate } from "react-router-dom";

export const dataSource = [
  {
    id: 1,
    img: "/images/Postgre.png",
    title: "PostGreSQL",
    source_type: "POSTGRESSQL",
  },
  {
    id: 2,
    img: "/images/Snowflake.png",
    title: "SnowFlake",
    source_type: "SNOWFLAKE",
  },
  {
    id: 3,
    img: "images/Amazon.png",
    title: "Amazon S3 CSV",
    source_type: "AMAZON",
  },
  {
    id: 4,
    img: "images/Dynamo.png",
    title: "Dynamo DB",
    source_type: "DYNAMO",
  },
  {
    id: 5,
    img: "../images/Ibm.png",
    title: "SnowFlake",
    source_type: "SNOWFLAKE",
  },
  {
    id: 6,
    img: "images/MySql.png",
    title: "MySQL",
    source_type: "MYSQL",
  },
  {
    id: 7,
    img: "../images/Mango.png",
    title: "Mamgo DB",
    source_type: "MANGO",
  },
  {
    id: 8,
    img: "images/Addnew.png",
    title: "Add Datasource",
    source_type: "ADD",
  },
];

function Datasources(props) {
  const { currentSource } = props;
  const navigate = useNavigate();

  function handleClick(id) {
    navigate("/configuration/" + id);
  }
  // console.log(currentSource && currentSource.img, "img");
  return (
    <>
      {currentSource && currentSource ? (
        <Col span={8}>
          <ImageContainer>
            <img src={currentSource && currentSource.img} />
          </ImageContainer>
          <ImageTitle>
            <p>{currentSource.title}</p>
          </ImageTitle>
        </Col>
      ) : (
        <>
          {dataSource.map((data) => {
            return (
              <Col span={8}>
                <Card
                  id={data.id}
                  onClick={(e) => handleClick(data.id)}
                  hoverable
                >
                  <ImageContainer>
                    <img src={data.img}></img>
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

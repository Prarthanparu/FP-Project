import React from "react";
import styled from "styled-components";
import Logo from "../Components/Flying_Base.png";
import { Input, Space, Avatar } from "antd";
import { Menu, Dropdown, Button, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { InfoCircleOutlined, BellOutlined } from "@ant-design/icons";
import "../App.less";
import { Link } from "react-router-dom";

function handleMenuClick(e) {
  message.info("Selected.");
  console.log("click", e);
}

function Header() {
  const { Search } = Input;
  const onSearch = (value) => console.log(value);
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderBar>
      <FirstDiv>
        <LogoContainer>
          <a>
            <img src={Logo} alt="" />
          </a>
        </LogoContainer>
        <HeaderSearch>
          <Space direction="vertical">
            <Search
              placeholder="Search Anything (⌘)"
              onSearch={onSearch}
              enterButton
              style={{ marginLeft: 20, width: 284 }}
            />
          </Space>
        </HeaderSearch>
        <HeaderContent>
          <Dropdown overlay={menu}>
            <Button>
              Query <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu}>
            <Button>
              Tabel <DownOutlined />
            </Button>
          </Dropdown>
          <Dropdown overlay={menu}>
            <Button>
              Checks <DownOutlined />
            </Button>
          </Dropdown>
          <InfoCircleOutlined style={{ fontSize: 24 }} />
          <BellOutlined style={{ fontSize: 24 }} />
        </HeaderContent>
        <AvatarContent>
          <Avatar size={54} icon={<UserOutlined />} />
          <AvatarName>
            <h1>John Robin</h1>
            <h6>johnrobin@gmail.com</h6>
          </AvatarName>
        </AvatarContent>
      </FirstDiv>
    </HeaderBar>
  );
}

export default Header;
const HeaderBar = styled.div`
  display: flex;

  flex-direction: column;
`;
const FirstDiv = styled.div`
  display: flex;
  background: #272728;
  box-shadow: 0 4px 8px -2px rgba(0, 0, 0, 0.55);
  border-radius: 3px;
  z-index: 1;
  color: #fff;
  padding: 0px;
`;

const LogoContainer = styled.div`
  background: #000000;
  padding: 10px;
  width: 156px;
  border-bottom: 1px solid rgba(84, 84, 84, 0.6);

  > a img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.4;
  justify-content: flex-start;
  align-items: center;
`;
const HeaderContent = styled.div`
  display: flex;
  flex: 0.5;
  align-items: center;
  justify-content: flex-end;
  gap: 30px;
  margin-right: 20px;
`;

const AvatarContent = styled.div`
  display: flex;
  flex: 0.1;
  justify-content: flex-end;
  align-items: center;
  /* margin-right:30px; */
`;

const AvatarName = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  align-items: left;
  margin-right: 15px;
  > h1 {
    font-size: 12px;
    font-weight: 600;
  }
`;

import React from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout } from "antd";
import "antd/dist/antd.css";

import "./index.css";
const { Header } = Layout;

const AppHeader = ({ collapsed, setCollapsed, role, logout }) => {
  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })}
      <h2>{`Kretaverse ${
        role === "vender" ? "Vender Dashboard" : "Admin Dashboard"
      }`}</h2>

      <div className="logout">
        <LogoutOutlined className="logout-btn" onClick={logout} />
      </div>
    </Header>
  );
};

export default AppHeader;

import React from "react";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";

import "./index.css";
const { Sider } = Layout;

const SideBar = ({ list, collapsed }) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={list}
      />
    </Sider>
  );
};

export default SideBar;

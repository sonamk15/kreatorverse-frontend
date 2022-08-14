import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Sidebar from "./Sidebar";

const { Header, Sider, Content } = Layout;

const MainLayout = () => (
  <>
    <Layout>
      <Header>
        <p
          style={{
            color: "#fff",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          Kretaverse
        </p>
      </Header>
      <Layout>
        <Sider style={{ background: "#FFF" }}>
          <Sidebar />
        </Sider>
        <Content
          style={{
            margin: "0 24px 24px",
            backgroundColor: "#FFFFFF",
            height: "85vh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  </>
);

export default MainLayout;

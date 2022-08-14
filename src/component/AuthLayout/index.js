import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "antd/dist/antd.css";

const { Header, Content } = Layout;

const AuthLayout = () => (
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
        <Content
          style={{
            //   margin: '0 24px 24px',
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

export default AuthLayout;

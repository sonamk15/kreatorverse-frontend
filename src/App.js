import { useState } from "react";
import { useRoutes } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  UsergroupAddOutlined,
  OrderedListOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Row, Layout } from "antd";
import "antd/dist/antd.css";
import routes from "./routes";
import authRoutes from "./authRoutes";
import SideBar from "./component/AppLayout/sideBar";
import AppHeader from "./component/AppLayout/header";
import { setAuthToken } from "./redux/ducks/authSlice";
import "./app.css";
const { Content } = Layout;

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authToken, role } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  let appRoutes = useRoutes(
    authToken ? authRoutes(authToken, role) : routes(authToken, role)
  );
  const superAdminNavitem = [
    {
      key: "1",
      label: "Products",
      icon: <OrderedListOutlined />,
      onClick: () => navigate("/dashboard/product"),
    },
    {
      key: "2",
      label: "Venders",
      icon: <UsergroupAddOutlined />,
      onClick: () => navigate("/dashboard/vender"),
    },
    {
      key: "3",
      label: "Create Vender",
      icon: <PlusCircleOutlined />,
      onClick: () => navigate("/dashboard/create-vender"),
    },
  ];

  const venderItemNavItem = [
    {
      key: "1",
      label: "Products",
      icon: <UsergroupAddOutlined />,
      onClick: () => navigate("/dashboard/product"),
    },
    {
      key: "2",
      label: "Create Products",
      icon: <PlusCircleOutlined />,
      onClick: () => navigate("/dashboard/create-product"),
    },
  ];

  const logout = () => {
    localStorage.clear();
    dispatch(setAuthToken({ authToken: "", role: "" }));
    navigate("/login");
  };
  return authToken ? (
    <Row justify="center" className="app-layout-div">
      <Layout>
        <SideBar
          list={role === "vender" ? venderItemNavItem : superAdminNavitem}
          collapsed={collapsed}
        />
        <Layout className="site-layout">
          <AppHeader
            setCollapsed={setCollapsed}
            collapsed={collapsed}
            role={role}
            logout={logout}
          />
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {appRoutes}
          </Content>
        </Layout>
      </Layout>
    </Row>
  ) : (
    <Row justify="center" className="app-layout-div">
      {appRoutes}
    </Row>
  );
};

export default App;

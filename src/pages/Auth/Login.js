import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import "antd/dist/antd.css";
import { Button, Form, Input, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.css";
import { setAuthToken } from "../../redux/ducks/authSlice";
import { axiosUnauthorizedInstance } from "../../api/axiosInstance";
import HideEye from "../../assets/hide-eye.png";
import ShowEye from "../../assets/show-eye.png";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const setVisibility = () => {
    setVisible(!visible);
  };

  const onFinish = (values) => {
    let payload = {
      email: values.email,
      password: values.password,
    };
    setSignInLoading(true);
    axiosUnauthorizedInstance
      .post("auth/login", payload)
      .then((response) => {
        const { success, token, role } = response.data;
        if (success) {
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          dispatch(setAuthToken({ authToken: token, role }));
          setTimeout(() => {
            navigate("/dashboard/product");
          }, 100);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSignInLoading(false);
      });
  };

  return (
    <Row justify="center" className="login-div">
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={(value) => onFinish(value)}
        autoComplete="off"
        className="login-form"
      >
        <Row justify="center">
          <Col xl={24} lg={12} md={12} xs={24}>
            <Form.Item
              className="form-item"
              name="email"
              validateTrigger={"onBlur"}
              rules={[
                {
                  type:'email',
                  message:'Email id entered is not valid'
                },
                {
                  required: true,
                  message: "Please input your email!",
                }
              ]}
            >
              <Input
                autoComplete="off"
                placeholder="Email"
                prefix={<UserOutlined />}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="center">
          <Col xl={24} lg={12} md={12} xs={24}>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}
            >
              <Input
                autoComplete={false}
                type={visible ? "text" : "password"}
                placeholder="Password"
                visibilityToggle={false}
                prefix={<LockOutlined />}
                suffix={
                  <img
                    className='visibility-btn'
                    src={visible ? ShowEye : HideEye}
                    alt=""
                    onClick={setVisibility}
                  />
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Row justify={"center"}>
            <Button
              loading={signInLoading}
              type="primary"
              htmlType="submit"
              size='large'
              className="login-btn"
            >
              Log In
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default Login;

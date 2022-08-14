import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
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
  const emailRegExp =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
            navigate("/verification");
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
    <Form
      name="basic"
      form={form}
      initialValues={{ remember: true }}
      onFinish={(value) => onFinish(value)}
      autoComplete="off"
    >
      <Row justify="center">
        <Col xl={24} lg={12} md={12} xs={24}>
          <Form.Item
            name="email"
            validateTrigger={"onBlur"}
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value && value.trim() && emailRegExp.test(value.trim())) {
                    return Promise.resolve();
                  }
                  if (value) {
                    return Promise.reject("Email id entered is not valid");
                  } else {
                    return Promise.reject();
                  }
                },
              }),
            ]}
          >
            <Input autoComplete="off" placeholder="Email address" />
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
              suffix={
                <img
                  i={true}
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
            size={"lg"}
          >
            Log In
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default Login;

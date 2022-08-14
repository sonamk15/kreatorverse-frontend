import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, Input, PageHeader, Row } from "antd";
import { axiosAuthorizedInstance } from "../../api/axiosInstance";
import "./index.css";

const CreateVender = () => {
  const navigate = useNavigate();
  const [signInLoading, setSignInLoading] = useState(false);
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      address: values.address,
      role: "vender",
    };
    setSignInLoading(false);

    axiosAuthorizedInstance()
      .post("super-admin/create-vender", payload)
      .then((response) => {
        const { success, message } = response.data;
        if (success) {
          alert('Vender Create Successfully!')
        } else {
            alert(message)
        }
      })
      .catch((error) => {
        const {response} = error;
        alert(response.data.message)
        console.error(error);
      })
      .finally(() => {
        setSignInLoading(false);
      });
  };
  return (
    <div>
      <PageHeader title="Create Vender" />
      <Row justify="center" className="create-vender">
        <Form
          {...layout}
          name="basic"
          onFinish={(value) => onFinish(value)}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter vender name",
              },
            ]}
          >
            <Input placeholder="Vender Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter vender email",
              },
            ]}
          >
            <Input placeholder="Vender Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter password!",
              },
            ]}
          >
            <Input placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please enter vender's phone number",
              },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>

          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please enter vender's address",
              },
            ]}
          >
            <Input.TextArea placeholder="Address" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={signInLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </div>
  );
};

export default CreateVender;

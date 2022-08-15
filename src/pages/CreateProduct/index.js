import React, { useState } from "react";
import { Button, Form, Input, PageHeader, Row } from "antd";
import { axiosAuthorizedInstance } from "../../api/axiosInstance";
import "./index.css";

const CreateProduct = () => {
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
      price: values.price,
      category: values.category,
    };
    setSignInLoading(true);
    axiosAuthorizedInstance()
      .post("vender/product", payload)
      .then((response) => {
        const { success, message } = response.data;
        if (success) {
          alert("Product Created Successfully!");
        } else {
          alert(message);
        }
      })
      .catch((error) => {
        const { response } = error;
        alert(response.data.message);
        console.error(error);
      })
      .finally(() => {
        setSignInLoading(false);
      });
  };
  return (
    <div>
      <PageHeader title="Create Product" />
      <Row justify="center" className="create-product">
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
                message: "Please enter Product name",
              },
            ]}
          >
            <Input placeholder="Product Name" />
          </Form.Item>

          <Form.Item
            name="price"
            rules={[
              {
                required: true,
                message: "Please enter product price",
              },
            ]}
          >
            <Input placeholder="Product Price" />
          </Form.Item>

          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: "Please enter product category!",
              },
            ]}
          >
            <Input placeholder="Product category" />
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

export default CreateProduct;

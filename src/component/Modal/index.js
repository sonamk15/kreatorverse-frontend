import { Modal } from "antd";
import React, { useEffect } from "react";
import { Button, Form, Input, PageHeader, Row } from "antd";

const AppModal = ({
  isModalVisible,
  handleCancel,
  productData,
  onFinish,
}) => {
  const [form] = Form.useForm();
  form.setFieldsValue({
    name: productData.name,
    price: productData.price,
    category: productData.category,
  });
  return (
    <>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <div>
          <PageHeader title="Create Product" />
          <Row justify="center">
            <Form
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
                <Button type="primary" htmlType="submit" size="large">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default AppModal;

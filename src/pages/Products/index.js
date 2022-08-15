import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageHeader, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { axiosAuthorizedInstance } from "../../api/axiosInstance";
import { setProducts } from "../../redux/ducks/productSlice";
import AppTable from "../../component/Table";
import AppModal from "../../component/Modal";
import "./index.css";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.product);
  const role = localStorage.getItem("role");

  const showModal = (data) => {
    setProductData(data);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    const payload = {
      name: values.name,
      price: values.price,
      category: values.category,
    };
    updateProduct(payload);
    handleCancel();
  };

  const deleteProduct = (id) => {
    axiosAuthorizedInstance()
      .delete(`vender/${id}/product`)
      .then((response) => {
        const { success } = response.data;
        if (success) {
          getProduct();
        } else {
          alert("some thing went wrong!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateProduct = (payload) => {
    axiosAuthorizedInstance()
      .patch(`vender/${productData["_id"]}/product`, payload)
      .then((response) => {
        const { success } = response.data;
        if (success) {
          getProduct();
        } else {
          alert("some thing went wrong!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
  ];

  const vanderColumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Delete",
      dataIndex: "_id",
      render: (_, data) => {
        const id = data["_id"];
        return (
          <DeleteOutlined
            className="action-btn dn-btn"
            onClick={() => deleteProduct(id)}
          />
        );
      },
    },
    {
      title: "Update",
      dataIndex: "_id",
      render: (_, data) => {
        return (
          <EditOutlined
            className="action-btn wr-btn"
            onClick={() => showModal(data)}
          />
        );
      },
    },
  ];

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    const url = role === "vender" ? "vender/product" : "super-admin/product";
    axiosAuthorizedInstance()
      .get(url)
      .then((response) => {
        const { data, success } = response.data;
        if (success) {
          dispatch(setProducts({ data }));
        } else {
          alert("some thing went wrong!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Row className="list-product">
      <PageHeader title="List Of Products" />
      <AppTable
        columns={role === "vender" ? vanderColumns : columns}
        data={data}
      />
      <AppModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        productData={productData}
        onFinish={onFinish}
      />
    </Row>
  );
};

export default Product;

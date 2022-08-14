import React, { useEffect, useState } from "react";
import { PageHeader, Row } from "antd";
import { axiosAuthorizedInstance } from "../../api/axiosInstance";
import AppTable from "../../component/Table"
import "./index.css";

const Vendors = () => {
  const [vender, setVender] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  

  useEffect(() => {
    axiosAuthorizedInstance()
      .get("/super-admin/venders")
      .then((response) => {
        const { data, success } = response.data;
        if (success) {
          setVender(data);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Row className="list-venders" >
      <PageHeader title="List Of Venders" />
      <AppTable columns={columns} data={vender} />
    </Row>
  );
};

export default Vendors;

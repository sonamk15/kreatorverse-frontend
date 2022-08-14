import { Table } from "antd";

const AppTable = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} />;
};

export default AppTable;

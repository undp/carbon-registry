import { PlusOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Col, Popconfirm, Row, Space, Table } from 'antd';
import React from 'react';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import './userManagement.scss';
import '../Common/common.table.scss';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { TableDataType } from '../../Definitions/InterfacesAndType/userManagement.definitions';

const UserManagement = () => {
  const navigate = useNavigate();
  const columns: ColumnsType<TableDataType> = [
    {
      title: 'User ID',
      dataIndex: 'userID',
      sorter: true,
      key: 'userID',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      sorter: true,
      key: 'username',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNo',
      key: 'contactNo',
      responsive: ['lg', 'md', 'sm'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      sorter: true,
      key: 'role',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      responsive: ['lg', 'md'],
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      responsive: ['lg', 'md'],
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      responsive: ['lg', 'md'],
    },
    {
      title: 'Action',
      render: () => (
        <Space size={'middle'}>
          <PencilSquare color="#0468B1" />
          <Popconfirm
            title={`Are you sure to delete the user`}
            placement="topLeft"
            icon={<WarningOutlined style={{ fontSize: '1.2rem' }} color="#eec335" />}
            okText="Yes"
            okButtonProps={{ danger: true }}
            cancelText="No"
            cancelButtonProps={{ type: 'primary' }}
          >
            <Trash color="#D12800" />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const tableData: TableDataType[] = [
    {
      key: '1',
      userID: '1',
      username: 'Athavan',
      email: 'athavant@xeptagon.com',
      role: 'Admin',
      contactNo: '0777123456',
      companyName: 'Xeptagon',
      country: 'Sri Lanka',
      state: 'North',
    },
    {
      key: '2',
      userID: '2',
      username: 'Yathu',
      email: 'yath@xeptagon.com',
      role: 'Root',
      contactNo: '0777123456',
      companyName: 'Xeptagon',
      country: 'Sri Lanka',
      state: 'North',
    },
    {
      key: '3',
      userID: '3',
      username: 'Shanika',
      email: 'shanika@xeptagon.com',
      role: 'Certifier',
      contactNo: '0777123456',
      companyName: 'Xeptagon',
      country: 'Sri Lanka',
      state: 'West',
    },
    {
      key: '4',
      userID: '4',
      username: 'Pallinda',
      email: 'pallinda@xeptagon.com',
      role: 'Admin',
      contactNo: '0777123456',
      companyName: 'Xeptagon',
      country: 'Sri Lanka',
      state: 'West',
    },
    {
      key: '5',
      userID: '5',
      username: 'Janith',
      email: 'janith@xeptagon.com',
      role: 'Root',
      contactNo: '0777123456',
      companyName: 'Xeptagon',
      country: 'Sri Lanka',
      state: 'West',
    },
  ];
  return (
    <div className="userManagement-container">
      <Row>
        {/* <Col span={4}> */}
        <div className="userManagement-addUser-btn-container">
          <Button
            type="primary"
            size="large"
            block
            icon={<PlusOutlined />}
            onClick={() => navigate('/addUser')}
          >
            ADD USER
          </Button>
        </div>
        {/* </Col> */}
        <Col span={24}>
          <div className="userManagement-table-container">
            <Table dataSource={tableData} columns={columns} className="common-table-class" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserManagement;

import { PlusOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Col, Empty, message, PaginationProps, Popconfirm, Row, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import './userManagement.scss';
import '../Common/common.table.scss';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { TableDataType } from '../../Definitions/InterfacesAndType/userManagement.definitions';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';

const UserManagement = () => {
  const navigate = useNavigate();
  const { get, delete: del } = useConnection();
  const [totalUser, setTotalUser] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  let columns: ColumnsType<TableDataType>;

  const deleteUser = async (email: string) => {
    setLoading(true);
    try {
      const response = await del(`user/delete?email=${email}`);
      if (response.status === 200) {
        message.open({
          type: 'success',
          content: response.message,
          duration: 3,
          style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
        });
        const temp = [...tableData];
        const index = temp.findIndex((value) => value.email === email);
        if (index > -1) {
          temp.splice(index, 1);
          setTableData(temp);
        }
        setLoading(false);
      }
    } catch (error: any) {
      console.log('Error in getting users', error);
      message.open({
        type: 'error',
        content: error.message,
        duration: 3,
        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
      });
      setLoading(false);
    }
  };

  if (localStorage.getItem('userRole') === 'Root' || localStorage.getItem('userRole') === 'Admin') {
    columns = [
      {
        title: 'User ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Username',
        dataIndex: 'name',
        key: 'name',
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
        render: (_, record: TableDataType) => (
          <Space size={'middle'}>
            <PencilSquare
              color="#0468B1"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('updateUser', { state: { record } });
              }}
            />
            <Popconfirm
              title={`Are you sure to delete the user`}
              placement="topLeft"
              onConfirm={() => deleteUser(record.email)}
              icon={<WarningOutlined style={{ fontSize: '1.2vw' }} color="#eec335" />}
              okText="Yes"
              okButtonProps={{ danger: true }}
              cancelText="No"
              cancelButtonProps={{ type: 'primary' }}
            >
              <Trash color="#D12800" style={{ cursor: 'pointer' }} />
            </Popconfirm>
          </Space>
        ),
      },
    ];
  } else {
    columns = [
      {
        title: 'User ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Username',
        dataIndex: 'name',
        key: 'name',
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
    ];
  }

  const getAllUser = async () => {
    setLoading(true);
    try {
      const response: any = await get('user/query', {
        params: {
          page: currentPage,
          size: pageSize,
        },
      });
      setTableData(response.data);
      setTotalUser(response.response.data.total);
      setLoading(false);
    } catch (error: any) {
      console.log('Error in getting users', error);
      message.open({
        type: 'error',
        content: error.message,
        duration: 3,
        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUser();
  }, [currentPage, pageSize]);

  const onChange: PaginationProps['onChange'] = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

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
            onClick={() => navigate('addUser')}
          >
            Add User
          </Button>
        </div>
        {/* </Col> */}
        <Col span={24}>
          <div className="userManagement-table-container">
            <Table
              dataSource={tableData}
              columns={columns}
              className="common-table-class"
              loading={loading}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: totalUser,
                showQuickJumper: true,
                showSizeChanger: true,
                onChange: onChange,
              }}
              scroll={{ x: 1500 }}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={tableData.length === 0 ? 'No Users' : null}
                  />
                ),
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UserManagement;

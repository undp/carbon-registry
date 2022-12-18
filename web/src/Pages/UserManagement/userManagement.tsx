import {
  BankOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExperimentOutlined,
  EyeOutlined,
  PlusOutlined,
  SafetyOutlined,
  SearchOutlined,
  StarOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Empty,
  List,
  message,
  PaginationProps,
  Popconfirm,
  Popover,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import './userManagement.scss';
import '../Common/common.table.scss';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { TableDataType } from '../../Definitions/InterfacesAndType/userManagement.definitions';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import RoleIcon from '../../Components/RoleIcon/role.icon';
import {
  AdminBGColor,
  AdminColor,
  CertBGColor,
  CertColor,
  DevBGColor,
  DevColor,
  GovBGColor,
  GovColor,
  ManagerBGColor,
  ManagerColor,
  RootBGColor,
  RootColor,
  ViewBGColor,
  ViewColor,
} from '../Common/role.color.constants';
import ProfileIcon from '../../Components/ProfileIcon/profile.icon';

const UserManagement = () => {
  const navigate = useNavigate();
  const { get, delete: del } = useConnection();
  const [totalUser, setTotalUser] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const getCompanyBgColor = (item: string) => {
    if (item === 'Government') {
      return GovBGColor;
    } else if (item === 'Certifier') {
      return CertBGColor;
    }
    return DevBGColor;
  };

  const getRoleComponent = (item: string) => {
    return (
      <div style={{ display: 'flex' }}>
        {item === 'Admin' ? (
          <RoleIcon icon={<StarOutlined />} bg={AdminBGColor} color={AdminColor} />
        ) : item === 'Root' ? (
          <RoleIcon icon={<SearchOutlined />} bg={RootBGColor} color={RootColor} />
        ) : item === 'Manager' ? (
          <RoleIcon icon={<ToolOutlined />} bg={ManagerBGColor} color={ManagerColor} />
        ) : (
          <RoleIcon icon={<EyeOutlined />} bg={ViewBGColor} color={ViewColor} />
        )}
        <div>{item}</div>
      </div>
    );
  };

  const getCompanyRoleComponent = (item: string) => {
    return (
      <div style={{ display: 'flex' }}>
        {item === 'Government' ? (
          <RoleIcon icon={<BankOutlined />} bg={GovBGColor} color={GovColor} />
        ) : item === 'Certifier' ? (
          <RoleIcon icon={<SafetyOutlined />} bg={CertBGColor} color={CertColor} />
        ) : (
          <RoleIcon icon={<ExperimentOutlined />} bg={DevBGColor} color={DevColor} />
        )}
        {item === 'ProgrammeDeveloper' ? <div>{'Developer'}</div> : <div>{item}</div>}
      </div>
    );
  };

  const actionMenu = (record: TableDataType) => {
    return (
      <List
        className="action-menu"
        size="small"
        dataSource={[
          {
            text: 'Edit',
            icon: <EditOutlined />,
            click: () => {
              navigate('/userManagement/updateUser', { state: { record } });
            },
          },
          { text: 'Delete', icon: <DeleteOutlined />, click: () => {} },
        ]}
        renderItem={(item) => (
          <List.Item onClick={item.click}>
            <Typography.Text className="action-icon">{item.icon}</Typography.Text>
            <span>{item.text}</span>
          </List.Item>
        )}
      />
    );
  };

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

  // if (localStorage.getItem('userRole') === 'Root' || localStorage.getItem('userRole') === 'Admin') {
  //   columns = [
  //     {
  //       title: 'User ID',
  //       dataIndex: 'id',
  //       key: 'id',
  //     },
  //     {
  //       title: 'Username',
  //       dataIndex: 'name',
  //       key: 'name',
  //     },
  //     {
  //       title: 'Contact Number',
  //       dataIndex: 'contactNo',
  //       key: 'contactNo',
  //       responsive: ['lg', 'md', 'sm'],
  //     },
  //     {
  //       title: 'Email',
  //       dataIndex: 'email',
  //       key: 'email',
  //     },
  //     {
  //       title: 'Role',
  //       dataIndex: 'role',
  //       key: 'role',
  //     },
  //     {
  //       title: 'Company Name',
  //       dataIndex: 'companyName',
  //       key: 'companyName',
  //       responsive: ['lg', 'md'],
  //     },
  //     {
  //       title: 'Country',
  //       dataIndex: 'country',
  //       key: 'country',
  //       responsive: ['lg', 'md'],
  //     },
  //     {
  //       title: 'State',
  //       dataIndex: 'state',
  //       key: 'state',
  //       responsive: ['lg', 'md'],
  //     },
  //     {
  //       title: 'Action',
  //       render: (_, record: TableDataType) => (
  //         <Space size={'middle'}>
  //           <PencilSquare
  //             color="#0468B1"
  //             style={{ cursor: 'pointer' }}
  //             onClick={() => {
  //               navigate('updateUser', { state: { record } });
  //             }}
  //           />
  // <Popconfirm
  //   title={`Are you sure to delete the user`}
  //   placement="topLeft"
  //   onConfirm={() => deleteUser(record.email)}
  //   icon={<WarningOutlined style={{ fontSize: '1.2vw' }} color="#eec335" />}
  //   okText="Yes"
  //   okButtonProps={{ danger: true }}
  //   cancelText="No"
  //   cancelButtonProps={{ type: 'primary' }}
  // >
  //   <Trash color="#D12800" style={{ cursor: 'pointer' }} />
  // </Popconfirm>
  //         </Space>
  //       ),
  //     },
  //   ];
  // } else {
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      align: 'left' as const,
      render: (item: any, itemObj: any) => {
        return (
          <div style={{ display: 'flex' }}>
            <ProfileIcon icon={undefined} bg={getCompanyBgColor(itemObj.companyRole)} name={item} />
            <div style={{ fontWeight: 600 }}>{item}</div>
          </div>
        );
      },
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      align: 'left' as const,
    },
    {
      title: 'PHONE',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
      align: 'left' as const,
    },
    {
      title: 'COMPANY',
      dataIndex: 'company',
      key: 'companyName',
      render: (x: any) => x.name,
      align: 'left' as const,
    },
    {
      title: 'COMPANY TYPE',
      dataIndex: 'companyRole',
      key: 'companyRole',
      align: 'left' as const,
      render: (item: any) => {
        return getCompanyRoleComponent(item);
      },
    },
    {
      title: 'ROLE',
      dataIndex: 'role',
      key: 'role',
      align: 'left' as const,
      render: (item: any) => {
        return getRoleComponent(item);
      },
    },
    {
      title: '',
      width: 6,
      align: 'right' as const,
      render: (_: any, record: TableDataType) => {
        return (
          <Popover placement="bottomRight" content={actionMenu(record)} trigger="click">
            <EllipsisOutlined
              rotate={90}
              style={{ fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
            />
          </Popover>
        );
      },
    },
  ];
  // }

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
    <div className="content-container">
      <div className="title-bar">
        <div className="body-title">View Users</div>
        <div className="body-sub-title">
          View all the visible users in the system based on your permissions
        </div>
      </div>
      <div className="content-card">
        <Row>
          <div className="action-bar">
            <Button
              type="primary"
              size="large"
              block
              icon={<PlusOutlined />}
              onClick={() => navigate('/userManagement/addUser')}
            >
              Add User
            </Button>
          </div>
        </Row>
        <Row>
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
                // scroll={{ x: 1500 }}
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
    </div>
  );
};

export default UserManagement;

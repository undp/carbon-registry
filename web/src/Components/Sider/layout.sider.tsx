import React, { useState } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { NavLink, useNavigate } from 'react-router-dom';
import './layout.sider.scss';
import {
  CodeSandboxOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LayoutSiderProps } from '../../Definitions/InterfacesAndType/layout.sider.definitions';

const LayoutSider = (props: LayoutSiderProps) => {
  const { selectedKey } = props;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  return (
    // <div className="layout-sider-container">
    <Sider
      width={300}
      className="layout-sider-container"
      breakpoint="lg"
      collapsedWidth="70"
      onCollapse={(col) => setCollapsed(col)}
    >
      <div className="layout-sider-container">
        <div className="layout-sider-heading-container">
          <span
            className="layout-sider-heading-txt"
            onClick={() => navigate('/dashboard', { replace: true })}
          >
            CARBON CREDIT
          </span>
        </div>
        <div className="layout-sider-menu-container">
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey ?? 'dashboard']}>
            <Menu.Item key="dashboard" icon={<CodeSandboxOutlined style={{ fontSize: '1.2vw' }} />}>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key="userManagement" icon={<UserOutlined style={{ fontSize: '1.2vw' }} />}>
              <NavLink to="/userManagement">User Management</NavLink>
            </Menu.Item>
            <Menu.Item key="Menu1" icon={<FileTextOutlined style={{ fontSize: '1.2vw' }} />}>
              Menu 1
            </Menu.Item>
            <Menu.Item key="Menu2" icon={<FileTextOutlined style={{ fontSize: '1.2vw' }} />}>
              Menu 2
            </Menu.Item>
            <Menu.Item key="Menu3" icon={<FileTextOutlined style={{ fontSize: '1.2vw' }} />}>
              Menu 3
            </Menu.Item>
            <Menu.Item key="Menu4" icon={<FileTextOutlined style={{ fontSize: '1.2vw' }} />}>
              Menu 4
            </Menu.Item>
            <Menu.Item key="Menu5" icon={<FileTextOutlined style={{ fontSize: '1.2vw' }} />}>
              Menu 5
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Sider>
    // </div>
  );
};

export default LayoutSider;

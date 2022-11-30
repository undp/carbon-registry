import React, { useState } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { NavLink, useNavigate } from 'react-router-dom';
import './layout.sider.scss';
import { CodeSandboxOutlined, DashboardOutlined, UserOutlined } from '@ant-design/icons';
import { LayoutSiderProps } from '../../Definitions/InterfacesAndType/layout.sider.definitions';

const LayoutSider = (props: LayoutSiderProps) => {
  const { selectedKey } = props;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      width={310}
      className="layout-sider-container"
      breakpoint="lg"
      collapsedWidth="70"
      onCollapse={(col) => {
        setCollapsed(col);
      }}
    >
      <div className="layout-sider-div-container">
        <div className="layout-sider-heading-container">
          <span
            className="layout-sider-heading-txt"
            onClick={() => navigate('/dashboard', { replace: true })}
          >
            {collapsed ? 'C' : 'CARBON'}
          </span>
        </div>
        <div className="layout-sider-menu-container">
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey ?? 'dashboard']}>
            <Menu.Item
              key="dashboard"
              icon={!collapsed ? <CodeSandboxOutlined style={{ fontSize: '1.2rem' }} /> : ''}
            >
              <NavLink to="/dashboard">
                {collapsed ? <CodeSandboxOutlined style={{ fontSize: '2rem' }} /> : 'Dashboard'}
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="userManagement"
              icon={!collapsed ? <UserOutlined style={{ fontSize: '1.2rem' }} /> : ''}
            >
              <NavLink to="/userManagement">
                {collapsed ? <UserOutlined style={{ fontSize: '2rem' }} /> : 'User Management'}
              </NavLink>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Sider>
  );
};

export default LayoutSider;

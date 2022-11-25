import React, { useState } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { NavLink, useNavigate } from 'react-router-dom';
import './layout.sider.scss';
import { CodeSandboxOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
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
            {collapsed ? 'C' : 'CARBON CREDIT'}
          </span>
        </div>
        <div className="layout-sider-menu-container">
          <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectedKey ?? 'dashboard']}>
            <Menu.Item
              key="dashboard"
              icon={!collapsed ?? <CodeSandboxOutlined style={{ fontSize: '1.2vw' }} />}
            >
              <NavLink to="/dashboard">
                {collapsed ? <CodeSandboxOutlined style={{ fontSize: '2vw' }} /> : 'Dashboard'}
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="userManagement"
              icon={!collapsed ?? <UserOutlined style={{ fontSize: '1.2vw' }} />}
            >
              <NavLink to="/userManagement">
                {collapsed ? <UserOutlined style={{ fontSize: '2vw' }} /> : 'User Management'}
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="Menu1"
              icon={!collapsed ?? <FileTextOutlined style={{ fontSize: '1.2vw' }} />}
            >
              {collapsed ? <FileTextOutlined style={{ fontSize: '2vw' }} /> : 'Menu 1'}
            </Menu.Item>
            <Menu.Item
              key="Menu2"
              icon={!collapsed ?? <FileTextOutlined style={{ fontSize: '1.2vw' }} />}
            >
              {collapsed ? <FileTextOutlined style={{ fontSize: '2vw' }} /> : 'Menu 2'}
            </Menu.Item>
            <Menu.Item
              key="Menu3"
              icon={!collapsed ?? <FileTextOutlined style={{ fontSize: '1.2vw' }} />}
            >
              {collapsed ? <FileTextOutlined style={{ fontSize: '2vw' }} /> : 'Menu 3'}
            </Menu.Item>
            <Menu.Item
              key="Menu4"
              icon={!collapsed ?? <FileTextOutlined style={{ fontSize: '1.2vw' }} />}
            >
              {collapsed ? <FileTextOutlined style={{ fontSize: '2vw' }} /> : 'Menu 4'}
            </Menu.Item>
            <Menu.Item
              key="Menu5"
              icon={!collapsed ?? <FileTextOutlined style={{ fontSize: '1.2vw' }} />}
            >
              {collapsed ? <FileTextOutlined style={{ fontSize: '2vw' }} /> : 'Menu 5'}
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Sider>
  );
};

export default LayoutSider;

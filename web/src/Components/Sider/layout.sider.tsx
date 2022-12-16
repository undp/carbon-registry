import React, { useState } from 'react';
import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import sliderLogo from '../../Assets/Images/logo-slider.png';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import './layout.sider.scss';
import {
  AppstoreOutlined,
  CodeSandboxOutlined,
  DashboardOutlined,
  HomeOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { LayoutSiderProps } from '../../Definitions/InterfacesAndType/layout.sider.definitions';
import SubMenu from 'antd/lib/menu/SubMenu';

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
        <div
          className="layout-sider-heading-container"
          onClick={() => navigate('/dashboard', { replace: true })}
        >
          <div className="logo">
            <img src={sliderLogo} alt="slider-logo" />
          </div>
          <div className="title">{collapsed ? '' : 'CARBON'}</div>
          <div className="title-sub">{collapsed ? '' : 'REGISTORY'}</div>
        </div>
        <div className="layout-sider-menu-container">
          <Menu theme="light" mode="inline" defaultSelectedKeys={[selectedKey ?? 'dashboard']}>
            <Menu.Item
              key="home"
              icon={!collapsed ? <HomeOutlined style={{ fontSize: '1.2rem' }} /> : ''}
            >
              <Link to="/dashboard">
                {collapsed ? <HomeOutlined style={{ fontSize: '2rem' }} /> : 'Home'}
              </Link>
            </Menu.Item>
            <Menu.Item
              key="dashboard"
              icon={!collapsed ? <DashboardOutlined style={{ fontSize: '1.2rem' }} /> : ''}
            >
              <Link to="/dashboard">
                {collapsed ? <DashboardOutlined style={{ fontSize: '2rem' }} /> : 'Dashboard'}
              </Link>
            </Menu.Item>
            <Menu.Item
              key="programmes"
              icon={!collapsed ? <AppstoreOutlined style={{ fontSize: '1.2rem' }} /> : ''}
            >
              <Link to="/dashboard">
                {collapsed ? <AppstoreOutlined style={{ fontSize: '2rem' }} /> : 'Programmes'}
              </Link>
            </Menu.Item>
            <SubMenu
              key="companies"
              icon={!collapsed ? <ShopOutlined style={{ fontSize: '1.2rem' }} /> : ''}
              title="Companies"
            >
              <Menu.Item key="add-company">
                <Link to="/companyManagement/addCompany">
                  {collapsed ? <UnorderedListOutlined style={{ fontSize: '2rem' }} /> : 'Add new'}
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item
              style={{ marginTop: '25px' }}
              key="userManagement"
              icon={!collapsed ? <UserOutlined style={{ fontSize: '1.2rem' }} /> : ''}
            >
              <Link to="/userManagement">
                {collapsed ? <UserOutlined style={{ fontSize: '2rem' }} /> : 'User Management'}
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Sider>
  );
};

export default LayoutSider;

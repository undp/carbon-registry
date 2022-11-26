import { Layout } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import React from 'react';
import { LayoutProps } from '../../Definitions/InterfacesAndType/layout.definitions';
import LayoutHeader from '../Header/layout.header';
import LayoutSider from '../Sider/layout.sider';
import './layout.scss';

const CustomLayout = (props: LayoutProps) => {
  const { title, selectedKey, children } = props;

  return (
    <div className="layout-main-container">
      <Layout hasSider>
        <LayoutSider selectedKey={selectedKey} />
        <Layout className="layout-container">
          <Header className="layout-header-container">
            <LayoutHeader title={title} />
          </Header>
          <Content>
            <div className="layout-content-container">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default CustomLayout;

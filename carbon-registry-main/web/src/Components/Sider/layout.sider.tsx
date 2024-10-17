import { useState } from 'react';
import { Menu, Layout, MenuProps } from 'antd';
import sliderLogo from '../../Assets/Images/Logo_registre_ci.png';
import sliderLogocollapse from '../../Assets/Images/icone_registre_ci.png';
import { Link, useNavigate } from 'react-router-dom';
import './layout.sider.scss';
import * as Icon from 'react-bootstrap-icons';
import {
  AppstoreOutlined,
  CompassOutlined,
  DashboardOutlined,
  HomeOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  UserOutlined,
  FallOutlined,
  CloudOutlined,
  EnvironmentOutlined,
  CustomerServiceOutlined,
  FolderOpenOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { LayoutSiderProps,useUserContext, CompanyRole } from 'carbon-library_ci';

const { Sider } = Layout;
const { SubMenu } = Menu;

type MenuItem = {
  key: React.Key;
  icon?: React.ReactNode;
  label: React.ReactNode;
} | null;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const LayoutSider = (props: LayoutSiderProps) => {
  const { selectedKey } = props;
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { i18n, t } = useTranslation(['nav']);
 const { userInfoState } = useUserContext();
  const items: MenuItem[] = userInfoState?.companyRole === CompanyRole.GOVERNMENT
    ? [
       getItem(t('nav:dashboard'), 'dashboard', <DashboardOutlined />),
       getItem("Notes d'idées", 'IdeaNoteManagement/viewAll', <AppstoreOutlined />),
       getItem(t('nav:programmes'), 'programmeManagement/viewAll', <AppstoreOutlined />),
       getItem(t('nav:ndcActions'), 'ndcManagement/viewAll', <Icon.Clipboard2Data />),
       getItem(t('nav:investments'), 'investmentManagement/viewAll', <Icon.Cash />),
       getItem('Cartographie projets', 'https://api.registrecarbone.skyvisionafrica.com/maps', <EnvironmentOutlined />),
       getItem(t('nav:transfers'), 'creditTransfers/viewAll', <Icon.ArrowLeftRight />),
       getItem('Signature Documents', 'https://registrecarbone.ci.skyvisionafrica.com/myregister', <EditOutlined/>),
       getItem(t('nav:companies'), 'companyManagement/viewAll', <ShopOutlined />),
       getItem(t('nav:users'), 'userManagement/viewAll', <UserOutlined />),
       getItem('Gestionnaire  Documents', 'https://registrecarbone.ci.skyvisionafrica.com/myregister', <FolderOpenOutlined />),
       getItem("Support d'utilisation", 'userSupport/viewAll', <CustomerServiceOutlined/>),
    ]
    : [
       getItem(t('nav:dashboard'), 'dashboard', <DashboardOutlined />),
       getItem(t('nav:programmes'), 'programmeManagement/viewAll', <AppstoreOutlined />),
       getItem(t('nav:ndcActions'), 'ndcManagement/viewAll', <Icon.Clipboard2Data />),
       getItem(t('nav:investments'), 'investmentManagement/viewAll', <Icon.Cash />),
       getItem(t('nav:transfers'), 'creditTransfers/viewAll', <Icon.ArrowLeftRight />),
       getItem(t('nav:companies'), 'companyManagement/viewAll', <ShopOutlined />),
       getItem(t('nav:users'), 'userManagement/viewAll', <UserOutlined />),
       getItem("Support d'utilisation", 'userSupport/viewAll', <CustomerServiceOutlined/>),
    ];
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
    navigate('/' + e.key);
  };

  return (
    <Sider
      width={240}
      className="layout-sider-container"
      breakpoint={collapsed ? undefined : 'lg'}
      collapsed={collapsed}
    >
      <div className="layout-sider-div-container">
        <div
          className="layout-sider-heading-container"
          onClick={() => navigate('/dashboard', { replace: true })}
        >
          {!collapsed && (
            <div className="logo">
              <img src={sliderLogo} alt="slider-logo" />
            </div>
          )}
          {collapsed && (
            <div className="logo">
              <img src={sliderLogocollapse} alt="slider-logo" />
            </div>
          )}
        </div>
        <div className="layout-sider-menu-container">
          <Menu
            theme="light"
            selectedKeys={[selectedKey ? selectedKey : 'dashboard']}
            mode="inline"
            onClick={onClick}
          >
            {items.map((item) => (
              <Menu.Item
                key={item?.key}
                icon={item?.icon}
                className={
                  item?.key === 'ndcManagement/viewAll' ||
                  item?.key === 'investmentManagement/viewAll'||
                  item?.key === 'projectMapping/viewAll'
                    ? 'custom-padding-left'
                    : ''
                }
              >
                <Link to={`${item?.key}`}>{item?.label}</Link>
                </Menu.Item>
            ))}
          </Menu>
        </div>
      </div>
      <div
        className="toggle-nav-btn"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        {collapsed ? <Icon.ArrowRight /> : <Icon.ArrowLeft />}
      </div>
    </Sider>
  );
};

export default LayoutSider;

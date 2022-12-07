import { Col, Dropdown, MenuProps, Row, Select } from 'antd';
import React from 'react';
import './layout.header.scss';
import countryLogo from '../../Assets/Images/nigeria.png';
import { useTranslation } from 'react-i18next';
import { HeaderProps } from '../../Definitions/InterfacesAndType/layout.header';
import { PersonCircle } from 'react-bootstrap-icons';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { useUserContext } from '../../Context/UserInformationContext/userInformationContext';

const LayoutHeader = (props: HeaderProps) => {
  const { title } = props;
  const { updateToken } = useConnection();
  const { removeUserInfo } = useUserContext();
  const { i18n } = useTranslation(['common', 'login']);
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const signOut = (): void => {
    updateToken();
    removeUserInfo();
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a onClick={() => signOut()}>Sign Out</a>,
    },
  ];

  return (
    <div className="header-container">
      <Row>
        <Col span={8}>
          <div className="header-country-logo">
            <img src={countryLogo} alt="country-logo" />
          </div>
        </Col>
        <Col span={8} offset={8}>
          <Row>
            <Col offset={14} span={10}>
              <div className="header-menu-container">
                <div className="header-signOut-container">
                  <Dropdown menu={{ items }} placement="bottomLeft">
                    <PersonCircle size={25} />
                  </Dropdown>
                </div>
                <span className="header-language-selection-txt">
                  {/* {t('common:language')} : */}
                  <Select
                    placeholder="Search to Select"
                    defaultValue={
                      localStorage.getItem('i18nextLng') !== null
                        ? localStorage.getItem('i18nextLng')
                        : 'en'
                    }
                    placement="bottomLeft"
                    onChange={(lan: string) => handleLanguageChange(lan)}
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                      {
                        value: 'en',
                        label: 'English',
                      },
                      {
                        value: 'es',
                        label: 'Española',
                      },
                      {
                        value: 'fr',
                        label: 'française',
                      },
                    ]}
                  />
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default LayoutHeader;

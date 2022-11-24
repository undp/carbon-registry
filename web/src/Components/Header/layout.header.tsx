import { Col, Row, Select } from 'antd';
import React from 'react';
import './layout.header.scss';
import countryLogo from '../../Assets/Images/nigeria.png';
import { useTranslation } from 'react-i18next';
import { HeaderProps } from '../../Definitions/InterfacesAndType/layout.header';

const LayoutHeader = (props: HeaderProps) => {
  const { title } = props;
  const { i18n } = useTranslation(['common', 'login']);
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="header-container">
      <Row>
        <Col span={8}>
          <div className="header-country-logo">
            <img src={countryLogo} alt="country-logo" />
          </div>
        </Col>
        <Col span={8}>
          <div className="header-title-container">
            <span className="header-title-txt">{title}</span>
          </div>
        </Col>
        <Col span={8}>
          <div className="header-language-selection-container">
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
    </div>
  );
};

export default LayoutHeader;

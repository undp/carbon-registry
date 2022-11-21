import { Button, Col, Input, Row, Select } from 'antd';
import React, { useEffect } from 'react';
// import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import './login.scss';
import countryLogo from '../../Assets/Images/nigeria.png';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const Login = () => {
  // const { get } = useConnection();
  const { i18n, t } = useTranslation(['common', 'login']);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (localStorage.getItem('i18nextLng') !== null) {
      if (localStorage.getItem('i18nextLng').length > 2) {
      }
      i18next.changeLanguage('en');
    }
  }, []);

  return (
    <div className="login-container">
      <Row>
        <Col span={15}>
          <div className="login-img-container">
            <span>
              {t('login:carbon')} <br /> {t('login:credit')} <br />
              {t('login:management')}
            </span>
          </div>
        </Col>
        <Col span={9}>
          <Row>
            <Col span={18} offset={3}>
              <Row>
                <Col span={9} offset={15}>
                  <div className="login-country-logo">
                    <img src={countryLogo} alt="country-logo" />
                  </div>
                  <div className="login-country-name">
                    <span>{t('common:nigeria')}</span>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={18} offset={3}>
              <div className="login-text-contents">
                <span className="login-text-signin">
                  {t('common:login')} <br />
                  <span className="login-text-welcome">{t('login:welcome-back')}</span>
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={18} offset={3}>
              <div className="login-input-fields">
                <div className="login-input-email">
                  <Input placeholder={`${t('common:email')}`} />
                </div>
                <div className="login-input-password">
                  <Input placeholder={`${t('common:pwd')}`} />
                </div>
                <div className="login-forget-pwd-container">
                  <span className="login-forget-pwd-txt">{t('login:forgot-pwd')} ?</span>
                </div>
                <div className="login-submit-btn-container">
                  <Button type="primary" size="large" block>
                    {t('common:login')}
                  </Button>
                </div>
                <div className="login-register-new-container">
                  <span className="login-register-new-txt">
                    {t('login:register-acc')}?&nbsp;&nbsp;
                    <span className="login-register-new-txt-span">{t('common:signUp')}</span>
                  </span>
                </div>
              </div>
              <div className="login-language-selection-container">
                <span className="login-language-selection-txt">
                  {t('common:language')} :
                  <Select
                    placeholder="Search to Select"
                    defaultValue={
                      localStorage.getItem('i18nextLng') !== null
                        ? localStorage.getItem('i18nextLng')
                        : 'en'
                    }
                    placement="topRight"
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

export default Login;

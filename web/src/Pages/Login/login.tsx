import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import './login.scss';
// import sha1 from 'sha1';
import countryLogo from '../../Assets/Images/nigeria.png';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useUserContext } from '../../Context/UserInformationContext/userInformationContext';
import { LoginProps } from '../../Definitions/InterfacesAndType/userLogin.definitions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { post, updateToken, removeToken } = useConnection();
  const { IsAuthenticated, setUserInfo } = useUserContext();
  const { i18n, t } = useTranslation(['common', 'login']);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const onSubmit = async (values: LoginProps) => {
    setLoading(true);
    try {
      const email = values.email.trim();
      const response = await post('auth/login', {
        username: email,
        password: values.password,
      });
      if (response.status === 200 || response.status === 201) {
        updateToken(response.data.access_token);
        setUserInfo({ id: response.data.id, userRole: response.data.role });
        removeToken();
        return IsAuthenticated() ? navigate('/dashboard', { replace: true }) : navigate('/login');
      }
      setLoading(false);
    } catch (error: any) {
      console.log('Error in Login', error);
      message.open({
        type: 'error',
        content: error.message,
        duration: 2,
        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('i18nextLng')!.length > 2) {
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
                <Form
                  layout="vertical"
                  onFinish={onSubmit}
                  name="login-details"
                  requiredMark={false}
                >
                  <Form.Item
                    name="email"
                    validateTrigger={'onBlur'}
                    rules={[
                      ({ getFieldValue }) => ({
                        validator() {
                          if (
                            getFieldValue('email') &&
                            !getFieldValue('email')
                              ?.trim()
                              .match(
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                              )
                          ) {
                            return Promise.reject('Please enter a valid E-mail!');
                          }
                          return Promise.resolve();
                        },
                      }),
                      {
                        required: true,
                        message: 'Email can not be empty!',
                      },
                    ]}
                  >
                    <div className="login-input-email">
                      <Input type="username" placeholder={`${t('common:email')}`} />
                    </div>
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Password can not be empty!',
                      },
                    ]}
                  >
                    <div className="login-input-password">
                      <Input.Password type="password" placeholder={`${t('common:pwd')}`} />
                    </div>
                  </Form.Item>
                  <div className="login-forget-pwd-container">
                    <span className="login-forget-pwd-txt">{t('login:forgot-pwd')} ?</span>
                  </div>
                  <Form.Item>
                    <div className="login-submit-btn-container">
                      <Button type="primary" size="large" htmlType="submit" block loading={loading}>
                        {t('common:login')}
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
                <div className="login-register-new-container">
                  <span className="login-register-new-txt">
                    {t('login:register-acc')}?&nbsp;&nbsp;
                    <span className="login-register-new-txt-span">{t('common:signUp')}</span>
                  </span>
                </div>
              </div>
            </Col>
          </Row>

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
    </div>
  );
};

export default Login;

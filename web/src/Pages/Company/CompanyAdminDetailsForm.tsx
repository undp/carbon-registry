import React, { useState } from 'react';
import './companyDetailsForm.scss';
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input';
import { Button, Col, Form, Input, InputNumber, Radio, Row, Select, Upload } from 'antd';
import {
  ExperimentOutlined,
  EyeOutlined,
  InboxOutlined,
  SafetyOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Option } = Select;

const CompanyAdminDetailsForm: React.FC = () => {
  const [contactNoInput, setContactNoInput] = useState<any>();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="company-details-form-container">
      <Form
        name="company-details"
        className="company-details-form"
        layout="vertical"
        requiredMark={false}
      >
        <Row className="row" gutter={[16, 16]}>
          <Col xl={12} md={24}>
            <div className="details-part-one">
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                name="contactNo"
                label="Contact Number"
                rules={[
                  {
                    required: true,
                    message: "Contact Number can't be empty!",
                  },
                ]}
              >
                <PhoneInput
                  placeholder="Contact number"
                  international
                  value={formatPhoneNumberIntl(contactNoInput)}
                  defaultCountry="LK"
                  countryCallingCodeEditable={false}
                  onChange={(v) => setContactNoInput(v)}
                />
              </Form.Item>
            </div>
          </Col>
          <Col xl={12} md={24}>
            <div className="details-part-two">
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input size="large" />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CompanyAdminDetailsForm;

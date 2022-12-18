import React, { useState } from 'react';
import './companyDetailsForm.scss';
import { Button, Col, Form, Input, InputNumber, Radio, Row, Select, Upload } from 'antd';
import {
  ExperimentOutlined,
  EyeOutlined,
  InboxOutlined,
  SafetyOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Option } = Select;

const CompanyDetailsForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
                label="Tax ID"
                name="taxId"
                rules={[{ required: true, message: 'Please input your tax id!' }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your tax id!' }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item
                label="Website"
                name="website"
                rules={[{ required: true, message: 'Please input your tax id!' }]}
              >
                <Input addonBefore="https://" size="large" />
              </Form.Item>
              <Form.Item
                name="companyLogo"
                label="Company Logo"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  className="logo-upload-section"
                  name="logo"
                  action="/upload.do"
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </div>
          </Col>
          <Col xl={12} md={24}>
            <div className="details-part-two">
              <Form.Item className="role-group" label="Role" name="role">
                <Radio.Group size="large">
                  <Radio.Button className="certifier" value="optional">
                    <SafetyOutlined className="role-icons" />
                    Certifier
                  </Radio.Button>
                  <Radio.Button className="dev" value>
                    <ExperimentOutlined className="role-icons" />
                    Programme Developer
                  </Radio.Button>
                  <Radio.Button className="observer" value={false}>
                    <EyeOutlined className="role-icons" />
                    Observer
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
              >
                <Input size="large" addonBefore={prefixSelector} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please input Address' }]}
              >
                <Input.TextArea rows={3} maxLength={100} />
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CompanyDetailsForm;

import React, { useState } from 'react';
import { Row, Col, Button, Form, Input, Select, message, Spin, Upload, Modal, Radio } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import PhoneInput, { formatPhoneNumberIntl } from 'react-phone-number-input';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import 'react-phone-number-input/style.css';
import './addUser.scss';
import '../../Styles/app.scss';
import '../Common/common.form.scss';
import { useNavigate } from 'react-router-dom';
import {
  ExperimentOutlined,
  EyeOutlined,
  PlusOutlined,
  SafetyOutlined,
  StarOutlined,
  ToolOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { RcFile, UploadProps } from 'antd/lib/upload';

const { Option } = Select;

const AddUser = () => {
  const { post } = useConnection();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [contactNoInput, setContactNoInput] = useState<any>();
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onSubmitData = async (values: any) => {
    setLoading(true);
    console.log({ ...values });
    try {
      values.phoneNo = formatPhoneNumberIntl(values.phoneNo);
      const response = await post('user/add', values);
      if (response.status === 200 || response.status === 201) {
        message.open({
          type: 'success',
          content: 'User added Successfully!',
          duration: 3,
          style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
        });
        navigate('/userManagement', { replace: true });
        setLoading(false);
      }
    } catch (error: any) {
      console.log('Error in user creation', error);
      message.open({
        type: 'error',
        content: `Error in adding user! ${error.message}`,
        duration: 3,
        style: { textAlign: 'right', marginRight: 15, marginTop: 10 },
      });
    } finally {
      setLoading(false);
      navigate('/userManagement/viewAll', { replace: true });
    }
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
    <div className="add-user-main-container">
      <div className="title-container">
        <div className="main">Add New User</div>
        <div className="sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</div>
      </div>
      <div className="content-card">
        <Form
          name="user-details"
          className="user-details-form"
          layout="vertical"
          requiredMark={false}
          onFinish={onSubmitData}
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
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: 'Please input your tax id!' }]}
                >
                  <Input size="large" />
                </Form.Item>
              </div>
            </Col>
            <Col xl={12} md={24}>
              <div className="details-part-two">
                <Form.Item className="role-group" label="Role" name="role">
                  <Radio.Group size="large">
                    <Radio.Button className="admin" value="Admin">
                      <StarOutlined className="role-icons" />
                      Admin
                    </Radio.Button>
                    <Radio.Button className="manager" value="Manager">
                      <ToolOutlined className="role-icons" />
                      Manager
                    </Radio.Button>
                    <Radio.Button className="view only" value="ViewOnly">
                      <EyeOutlined className="role-icons" />
                      View Only
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  name="phoneNo"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Contact Number can't be empty!",
                    },
                  ]}
                >
                  <PhoneInput
                    placeholder="Phone number"
                    international
                    value={formatPhoneNumberIntl(contactNoInput)}
                    defaultCountry="LK"
                    countryCallingCodeEditable={false}
                    onChange={(v) => setContactNoInput(v)}
                  />
                </Form.Item>
              </div>
            </Col>
          </Row>
          <div className="actions">
            <Form.Item>
              <div className="create-user-btn-container">
                <Button type="primary" htmlType="submit">
                  Create User
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
  //   <div className="create-user-container">
  //     <Spin spinning={loading}>
  //       <Form
  //         layout="vertical"
  //         name="userCreation"
  //         onFinish={onSubmitData}
  //         className="common-form-class"
  //       >
  //         <Row>
  //           <Col span={22} offset={1}>
  //             <Form.Item
  //               name="name"
  //               label="User Name"
  //               rules={[
  //                 {
  //                   required: true,
  //                   message: "User Name can't be empty!",
  //                 },
  //                 ({ getFieldValue }) => ({
  //                   validator() {
  //                     if (
  //                       getFieldValue('name') !== undefined &&
  //                       !getFieldValue('name').match(/^[a-zA-Z ]*$/gm)
  //                     ) {
  //                       return Promise.reject("User name can't have numbers!");
  //                     }
  //                     return Promise.resolve();
  //                   },
  //                 }),
  //               ]}
  //             >
  //               <Input placeholder="User Name" />
  //             </Form.Item>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col span={22} offset={1}>
  //             <Form.Item
  //               name="email"
  //               label="Email"
  //               rules={[
  //                 ({ getFieldValue }) => ({
  //                   validator() {
  //                     if (
  //                       getFieldValue('email') &&
  //                       !getFieldValue('email')
  //                         ?.trim()
  //                         .match(
  //                           /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //                         )
  //                     ) {
  //                       return Promise.reject('Please enter a valid E-mail!');
  //                     }
  //                     return Promise.resolve();
  //                   },
  //                 }),
  //                 {
  //                   required: true,
  //                   message: "Email can't be empty!",
  //                 },
  //               ]}
  //             >
  //               <Input placeholder="Email" />
  //             </Form.Item>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col span={11} offset={1}>
  //             <Form.Item
  //               name="role"
  //               label="Role"
  //               rules={[
  //                 {
  //                   required: true,
  //                   message: 'User should have a role!',
  //                 },
  //               ]}
  //             >
  //               <Select
  //                 placeholder="Select user role"
  //                 showSearch
  //                 optionFilterProp="children"
  //                 filterOption={(input, option: any) =>
  //                   option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
  //                 }
  //                 onChange={setUserRole}
  //                 placement="bottomLeft"
  //                 getPopupContainer={(triggerNode) => triggerNode.parentElement}
  //                 options={[
  //                   {
  //                     value: 'Root',
  //                     label: 'Root',
  //                   },
  //                   {
  //                     value: 'Admin',
  //                     label: 'Admin',
  //                   },
  //                   {
  //                     value: 'Certifier',
  //                     label: 'Certifier',
  //                   },
  //                   {
  //                     value: 'ProgrammeDeveloper',
  //                     label: 'Programme Developer',
  //                   },
  //                   {
  //                     value: 'General',
  //                     label: 'General',
  //                   },
  //                   {
  //                     value: 'Visitor',
  //                     label: 'Visitor',
  //                   },
  //                   {
  //                     value: 'ViewOnly',
  //                     label: 'View Only',
  //                   },
  //                 ]}
  //               />
  //             </Form.Item>
  //           </Col>
  //           {userRole === 'ProgrammeDeveloper' && (
  //             <Col span={10} offset={1}>
  //               <Form.Item
  //                 name="industry"
  //                 label="Industry"
  //                 rules={[
  //                   {
  //                     required: true,
  //                     message: "Industry can't be empty!",
  //                   },
  //                   ({ getFieldValue }) => ({
  //                     validator() {
  //                       if (
  //                         getFieldValue('industry') !== undefined &&
  //                         !getFieldValue('industry').match(/^[a-zA-Z ]*$/gm)
  //                       ) {
  //                         return Promise.reject("Industry name can't have numbers.");
  //                       }
  //                       return Promise.resolve();
  //                     },
  //                   }),
  //                 ]}
  //               >
  //                 <Input placeholder="Industry" />
  //               </Form.Item>
  //             </Col>
  //           )}
  //         </Row>
  //         {userRole === 'ProgrammeDeveloper' && (
  //           <Row>
  //             <Col span={22} offset={1}>
  //               <Form.Item
  //                 name="companyName"
  //                 label="Company Name"
  //                 rules={[
  //                   {
  //                     required: true,
  //                     message: "Company Name can't be empty!",
  //                   },
  //                 ]}
  //               >
  //                 <Input placeholder="Company Name" />
  //               </Form.Item>
  //             </Col>
  //           </Row>
  //         )}
  //         {userRole === 'ProgrammeDeveloper' && (
  //           <Row>
  //             <Col span={22} offset={1}>
  //               <Form.Item
  //                 name="companyLocation"
  //                 label="Company Location"
  //                 rules={[
  //                   {
  //                     required: true,
  //                     message: "Company Location can't be empty!",
  //                   },
  //                 ]}
  //               >
  //                 <Input placeholder="Company Location" />
  //               </Form.Item>
  //             </Col>
  //           </Row>
  //         )}
  //         {userRole === 'ProgrammeDeveloper' && (
  //           <Row>
  //             <Col span={22} offset={1}>
  //               <Form.Item
  //                 name="registrationNo"
  //                 label="Registration Number"
  //                 rules={[
  //                   {
  //                     required: true,
  //                     message: "Registration Number can't be empty!",
  //                   },
  //                 ]}
  //               >
  //                 <Input placeholder="Registration Number" />
  //               </Form.Item>
  //             </Col>
  //           </Row>
  //         )}
  //         {userRole === 'ProgrammeDeveloper' && (
  //           <Row>
  //             <Col span={22} offset={1}>
  //               <Form.Item
  //                 name="companyLogo"
  //                 label="Company Logo"
  //                 required
  //                 rules={[
  //                   () => ({
  //                     validator() {
  //                       if (fileList.length === 0) {
  //                         return Promise.reject('Upload the logo of the company!');
  //                       } else if (fileList.length > 1) {
  //                         return Promise.reject("Can't upload more than one Image!");
  //                       } else if (fileList.length === 1) {
  //                         return Promise.resolve();
  //                       } else {
  //                         return Promise.resolve();
  //                       }
  //                     },
  //                   }),
  //                 ]}
  //               >
  //                 <Upload
  //                   name="companyLogo"
  //                   listType="picture-card"
  //                   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  //                   fileList={fileList}
  //                   beforeUpload={beforeUpload}
  //                   onChange={handleChange}
  //                   onPreview={handlePreview}
  //                   multiple={false}
  //                 >
  //                   {fileList.length > 0 ? null : (
  //                     <div>
  //                       <PlusOutlined />
  //                       <div style={{ marginTop: 8 }}>Upload</div>
  //                     </div>
  //                   )}
  //                 </Upload>
  //                 <Modal
  //                   open={previewOpen}
  //                   title={previewTitle}
  //                   footer={null}
  //                   onCancel={handleCancel}
  //                 >
  //                   <img alt="example" style={{ width: '100%' }} src={previewImage} />
  //                 </Modal>
  //               </Form.Item>
  //             </Col>
  //           </Row>
  //         )}
  //         <Row>
  //           <Col span={11} offset={1}>
  //             <Form.Item
  //               name="city"
  //               label="City"
  //               rules={[
  //                 {
  //                   required: true,
  //                   message: "City can't be empty!",
  //                 },
  //                 ({ getFieldValue }) => ({
  //                   validator() {
  //                     if (
  //                       getFieldValue('city') !== undefined &&
  //                       !getFieldValue('city').match(/^[a-zA-Z ]*$/gm)
  //                     ) {
  //                       return Promise.reject("City name can't have numbers.");
  //                     }
  //                     return Promise.resolve();
  //                   },
  //                 }),
  //               ]}
  //             >
  //               <Input placeholder="City" />
  //             </Form.Item>
  //           </Col>
  //           <Col span={10} offset={1}>
  //             <Form.Item
  //               name="zipCode"
  //               label="Zip Code"
  //               rules={[
  //                 {
  //                   required: true,
  //                   message: "Zip Code can't be empty!",
  //                 },
  //                 () => ({
  //                   validator(_, value) {
  //                     if (!value) {
  //                       return Promise.reject();
  //                     }
  //                     if (isNaN(value)) {
  //                       return Promise.reject('Zip code has to be a number.');
  //                     }
  //                     return Promise.resolve();
  //                   },
  //                 }),
  //               ]}
  //             >
  //               <Input placeholder="Zip Code" />
  //             </Form.Item>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col span={11} offset={1}>
  //             <Form.Item
  //               name="state"
  //               label="State/Province"
  //               rules={[
  //                 {
  //                   required: true,
  //                   message: "State/Province can't be empty!",
  //                 },
  //               ]}
  //             >
  //               <Input placeholder="State/Province" />
  //             </Form.Item>
  //           </Col>
  //           <Col span={10} offset={1}>
  //             <Form.Item
  //               name="country"
  //               label="Country"
  //               rules={[
  //                 {
  //                   required: true,
  //                   message: "Country can't be empty!",
  //                 },
  //                 ({ getFieldValue }) => ({
  //                   validator() {
  //                     if (
  //                       getFieldValue('country') !== undefined &&
  //                       !getFieldValue('country').match(/^[a-zA-Z ]*$/gm)
  //                     ) {
  //                       return Promise.reject('Country name cant have numbers.');
  //                     }
  //                     return Promise.resolve();
  //                   },
  //                 }),
  //               ]}
  //             >
  //               <Input placeholder="Country" />
  //             </Form.Item>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col span={11} offset={1}>
  //             <Form.Item
  //               name="contactNo"
  //               label="Contact Number"
  //               rules={[
  //                 {
  //                   required: true,
  //                   message: "Contact Number can't be empty!",
  //                 },
  //               ]}
  //             >
  //               <PhoneInput
  //                 placeholder="Contact number"
  //                 international
  //                 value={formatPhoneNumberIntl(contactNoInput)}
  //                 defaultCountry="LK"
  //                 countryCallingCodeEditable={false}
  //                 onChange={(v) => setContactNoInput(v)}
  //               />
  //             </Form.Item>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col offset={8} span={8}>
  //             <Form.Item>
  //               <div className="create-user-btn-container">
  //                 <Button type="primary" size="large" htmlType="submit" block loading={loading}>
  //                   Create User
  //                 </Button>
  //               </div>
  //             </Form.Item>
  //           </Col>
  //         </Row>
  //       </Form>
  //     </Spin>
  //   </div>
  // );
};

export default AddUser;

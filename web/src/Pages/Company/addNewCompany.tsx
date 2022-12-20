import React, { useState } from 'react';
import './addNewCompany.scss';
import { Button, Steps, message } from 'antd';
import CompanyDetailsForm from './CompanyDetailsForm';
import CompanyAdminDetailsForm from './CompanyAdminDetailsForm';

const AddNewCompany = () => {
  const [current, setCurrent] = useState(0);
  const [companyDetailsFormVisible, setCompanyDetailsFormVisible] = useState<boolean>(true);
  const [companyAdminDetailsFormVisible, setCompanyAdminDetailsFormVisible] =
    useState<boolean>(false);

  const steps = [
    {
      title: <div className="step-title">Comapny Details</div>,
      description: companyDetailsFormVisible && <CompanyDetailsForm />,
    },
    {
      title: <div className="step-title">Comapny Admin Details</div>,
      description: companyAdminDetailsFormVisible && <CompanyAdminDetailsForm />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
    setCompanyDetailsFormVisible(false);
    setCompanyAdminDetailsFormVisible(true);
  };

  const prev = () => {
    setCurrent(current - 1);
    setCompanyDetailsFormVisible(true);
    setCompanyAdminDetailsFormVisible(false);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <div className="add-company-main-container">
      <div className="title-container">
        <div className="main">Add New Company</div>
        <div className="sub">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</div>
      </div>
      <div className="adding-section">
        <div className="form-section">
          <Steps progressDot direction="vertical" current={1} items={steps} />
        </div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewCompany;

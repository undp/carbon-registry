import React from 'react';
import CustomLayout from '../../Components/Layout/layout';
import AddUser from './addUser';

const AddUserLayout = () => {
  return (
    <div>
      <CustomLayout title="Add new User" selectedKey="userManagement">
        <AddUser />
      </CustomLayout>
    </div>
  );
};

export default AddUserLayout;

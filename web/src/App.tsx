import { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ConnectionContextProvider } from './Context/ConnectionContext/connectionContext';
import 'antd/dist/antd.css';
import Login from './Pages/Login/login';
// import DashboardLayout from './Pages/Dashboard/dashboard.layout';
// import UserManagementLayout from './Pages/UserManagement/userManagement.layout';
import { UserInformationContextProvider } from './Context/UserInformationContext/userInformationContext';
import PrivateRoute from './Components/PrivateRoute/privateRoute';
import SignUp from './Pages/Sign-up/signup';
// import AddUserLayout from './Pages/AddUser/addUserLayout';
// import UpdateUserLayout from './Pages/UpdateUser/updateUserLayout';
import CustomLayout from './Components/Layout/layout';
import AddUser from './Pages/AddUser/addUser';
import UpdateUser from './Pages/UpdateUser/updateUser';
import UserManagement from './Pages/UserManagement/userManagement';
import Dashboard from './Pages/Dashboard/dashboard';

const App = () => {
  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND);
  }, []);
  return (
    <Suspense fallback="loading...">
      <ConnectionContextProvider
        serverURL={
          process.env.REACT_APP_BACKEND
            ? process.env.REACT_APP_BACKEND
            : 'https://ck5kt5uaw1.execute-api.us-east-1.amazonaws.com/dev/api/national'
        }
      >
        <UserInformationContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/dashboard" element={<CustomLayout selectedKey="dashboard" />}>
                  <Route index element={<Dashboard />} />
                </Route>
                <Route
                  path="/userManagement"
                  element={<CustomLayout selectedKey="userManagement" />}
                >
                  <Route index element={<UserManagement />} />
                  <Route path="addUser" element={<AddUser />} />
                  <Route path="updateUser" element={<UpdateUser />} />
                </Route>
              </Route>
              <Route path="/*" element={<Navigate to="login" replace />} />
            </Routes>
          </BrowserRouter>
        </UserInformationContextProvider>
      </ConnectionContextProvider>
    </Suspense>
  );
};

export default App;

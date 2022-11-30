import { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ConnectionContextProvider } from './Context/ConnectionContext/connectionContext';
import 'antd/dist/antd.css';
import Login from './Pages/Login/login';
import DashboardLayout from './Pages/Dashboard/dashboard.layout';
import UserManagementLayout from './Pages/UserManagement/userManagement.layout';
import { UserInformationContextProvider } from './Context/UserInformationContext/userInformationContext';
import PrivateRoute from './Components/PrivateRoute/privateRoute';
import SignUp from './Pages/Sign-up/signup';
import AddUserLayout from './Pages/AddUser/addUserLayout';

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
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="dashboard" element={<DashboardLayout />} />
                <Route path="userManagement" element={<UserManagementLayout />} />
                <Route path="addUser" element={<AddUserLayout />} />
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

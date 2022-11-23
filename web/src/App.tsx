import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ConnectionContextProvider } from './Context/ConnectionContext/connectionContext';
import 'antd/dist/antd.css';
import Login from './Pages/Login/login';
import Dashboard from './Pages/Dashboard/dashboard';
import { UserInformationContextProvider } from './Context/UserInformationContext/userInformationContext';
import PrivateRoute from './Components/PrivateRoute/privateRoute';
import SignUp from './Pages/Sign-up/signup';

const App = () => {
  return (
    <Suspense fallback="loading...">
      <ConnectionContextProvider
        serverURL={
          process.env.REACT_APP_BACKEND
            ? process.env.REACT_APP_BACKEND
            : 'http://localhost:3000/local/api'
        }
      >
        <UserInformationContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="dashboard" element={<Dashboard />} />
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

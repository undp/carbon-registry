import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConnectionContextProvider } from './Context/ConnectionContext/connectionContext';
import Login from './Pages/Login/login';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <ConnectionContextProvider
      serverURL={
        process.env.REACT_APP_BACKEND ? process.env.REACT_APP_BACKEND : 'http://localhost:3000'
      }
    >
      <Suspense fallback="loading...">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </ConnectionContextProvider>
  );
};

export default App;

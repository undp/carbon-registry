import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './Components/Internationalization/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

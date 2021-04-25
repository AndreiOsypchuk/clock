import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RootProvider } from './context';
ReactDOM.render(
  <RootProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RootProvider>,
  document.getElementById('root')
);

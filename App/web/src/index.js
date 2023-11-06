import ReactDOM from 'react-dom/client';
import React from 'react';
import './index.css';
import Config from './Config'

const root = ReactDOM.createRoot( document.getElementById('root') );

root.render(
  <React.StrictMode>
    <Config />
  </React.StrictMode>
);

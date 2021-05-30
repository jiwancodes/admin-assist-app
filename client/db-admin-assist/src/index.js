import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


axios.defaults.baseURL ='http://localhost:6797';
// axios.defaults.baseURL =process.env.REACT_APP_EXPIRY_DATE_EXTEND_APP_SERVER_URL;


ReactDOM.render(
    <App />,
  document.getElementById('root')
);
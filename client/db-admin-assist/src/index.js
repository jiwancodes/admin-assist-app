import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider} from 'react-redux';
import store from './redux/store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from "axios";


// axios.defaults.baseURL ='http://localhost:6797';
// axios.defaults.baseURL =process.env.REACT_APP_EXPIRY_DATE_EXTEND_APP_SERVER_URL;


ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);
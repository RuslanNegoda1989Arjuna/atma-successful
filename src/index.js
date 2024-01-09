import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// import store from './redux/store';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'components/App';
import './index.css';
import './firebase'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/atma-successful">
        <App /> 
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

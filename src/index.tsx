import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'normalize.css';
import './styles/global.scss';
import store from './store';
import { registerSW } from './sw-register';

registerSW();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

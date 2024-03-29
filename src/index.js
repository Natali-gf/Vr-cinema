import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { BrowserRouter} from 'react-router-dom';
import { setupStore } from './store/store'
import { Provider } from 'react-redux'

const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>
);

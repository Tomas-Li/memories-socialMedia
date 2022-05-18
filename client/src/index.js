//External imports
import React from 'react';
import ReactDomClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//Reducers
import reducers from './reducers';

//Internal imports
import App from './App.jsx';

//UI
import { theme } from './mainTheme';
import { ThemeProvider } from '@mui/material';

//styles
import './index.css';


const store = createStore(reducers, compose(applyMiddleware(thunk)));


ReactDomClient.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
//External imports
import React from 'react';
import ReactDom from 'react-dom';
// import ReactDomClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

//Reducers
import reducers from './reducers'

//Internal imports
import App from './App.jsx'

//styles
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(  
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));


// const root = ReactDomClient.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
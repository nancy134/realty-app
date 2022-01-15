import React from 'react';
import ReactDOM from 'react-dom';
//import StyleContext from 'isomorphic-style-loader-react-17/StyleContext';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './theme.css';

//const insertCss = (...styles) => {
//  const removeCss = styles.map(style => style._insertCss())
//  return () => removeCss.forEach(dispose => dispose())
//}

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);


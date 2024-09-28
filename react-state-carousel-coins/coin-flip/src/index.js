import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // The main App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Rendering into the #root div in public/index.html
);

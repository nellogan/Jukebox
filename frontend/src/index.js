import React from "react";
import ReactDOM from "react-dom/client";
import "../static/css/index.css";
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
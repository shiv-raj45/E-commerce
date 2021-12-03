import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Context } from "./Context/Context.js";

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <Router>
        <App />
      </Router>
    </Context>
  </React.StrictMode>,
  document.getElementById("root")
);

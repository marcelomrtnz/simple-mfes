import React from "react";
import ReactDOM from "react-dom";
import Container from "./shared/ContentContainer";

import "./index.css";

const App = () => (
  <div className="container test">
    <Container />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));

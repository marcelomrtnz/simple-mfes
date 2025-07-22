import React from "react";
import ReactDOM from "react-dom";

import SidebarMFEContainer from "./components/SidebarMFE";
import ContentMFEContainer from "./components/ContentMFE";

import "./index.css";

const App = () => (
  <div className="container">
    <div className="row">
      <h1>Shell MFE</h1>
    </div>
    <div className="row flex-6 fullHeight">
      <div className="col">
        <SidebarMFEContainer />
      </div>
      <div className="col flex-2">
        <ContentMFEContainer />
      </div>
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
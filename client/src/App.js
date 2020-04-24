import React, { Component } from "react";
// import { Connector } from "mqtt-react";
import "./App.scss";
import AppRoutes from "./Routes";

class App extends Component {
  render() {
    return (
      <AppRoutes></AppRoutes>
    );
  }
}

export default App;

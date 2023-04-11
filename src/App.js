import React, { Component, Fragment } from "react";
import Footnote from "./components/Footnote";
import Header from "./components/Header";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <Home />
        <Footnote />
      </>
    );
  }
}

export default App;
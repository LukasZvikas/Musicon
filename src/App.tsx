import React, { Fragment } from "react";
import Header from "./components/header";
import Quiz from "./pages/quiz";
import Dashboard from "./pages/dashboard/index.js";
import "./App.css";

const App = ({}) => {
  return (
    <Fragment>
      {/* <Header /> */}
      {/* <Quiz /> */}
      <Dashboard />
    </Fragment>
  );
};

export default App;

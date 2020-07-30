import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/homepage.component";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage}></Route>
    </Switch>
  );
}

export default App;

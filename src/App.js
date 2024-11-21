import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ParadoxicaOpening from "./components/Site from "./components/MainSite";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ParadoxicaOpening} />
        <Route path="/main" component={MainSite} />
      </Switch>
    </Router>
  );
}

export default App;

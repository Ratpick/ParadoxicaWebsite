import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ParadoxicaOpening from "./components/ParadoxicaOpening";
import MainSite from "./components/MainSite";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ParadoxicaOpening} />
        <Route path="/main" component={MainSite} />
        <Route path="*" component={() => <h1>404 - Not Found</h1>} />
      </Switch>
    </Router>
  );
}

export default App;

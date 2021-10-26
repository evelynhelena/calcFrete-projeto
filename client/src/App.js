import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notfound from "./Pages/Notfound/Notfound";
import Loading from "./Components/Loanding/Loanding";
import CalcFrete from "./Pages/CalcFrete/CalcFrete";
import CadCity from "./Pages/CadCity/CadCity";
import ListCityPage from "./Pages/ListCity/ListCity";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CalcFrete} />
        <Route path="/cadCity" component={CadCity} />
        <Route path="/Loading" component={Loading} />
        <Route path="/ListCity" component={ListCityPage} />
        <Route path="/*" component={Notfound} />
      </Switch>
    </Router>
  );
}

export default App;

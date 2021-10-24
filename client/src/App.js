import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CadUnidadeMedida from './Pages/CadUnidadeMedida/CadUnidadeMedida';
import Login from './Pages/Login/Login';
import Notfound from './Pages/Notfound/Notfound';
import Loading from "./Components/Loanding/Loanding";
import CalcFrete from './Pages/CalcFrete/CalcFrete';
function App() {
  return (
       <Router>
        <Switch>
        <Route path="/" exact component={Login}/>
            <Route path="/calcFrete" component={CalcFrete}/>
            <Route path="/Loading" component={Loading}/>
            <Route path="/*" component={Notfound}/>
        </Switch>
      </Router>
  );
}

export default App;

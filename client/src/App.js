import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notfound from './Pages/Notfound/Notfound';
import Loading from "./Components/Loanding/Loanding";
import CalcFrete from './Pages/CalcFrete/CalcFrete';
function App() {
  return (
       <Router>
        <Switch>
            <Route path="/" component={CalcFrete}/>
            <Route path="/Loading" component={Loading}/>
            <Route path="/*" component={Notfound}/>
        </Switch>
      </Router>
  );
}

export default App;

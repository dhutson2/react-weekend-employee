import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Employees from "./EmployeesContainer";
import { Route, Switch } from 'react-router-dom';
import Register from './Register';

import Header from './Header';

const My404 = () => {
  return (
    <div>
      You're lost buddy
    </div>
    )
};
function App() {
  return (
    <main>
      <Header />
      <Switch>
        <Route exact path='/' component={ Register } />
        <Route exact path='/employees' component={ Employees } />
        <Route component={My404} />
      </Switch>
    </main>
  );
}
export default App
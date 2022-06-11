
import React from "react";
import { BrowserRouter as Router, Link, Route, Switch,Redirect } from "react-router-dom";
import Login from "./components/Session/login";
import Logout from "./components/Session/logout";
import Dashboard from "./components/Common/dashboard";


function App(props) {
  return (
    
      <Router>
        <Switch>
       
        <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Redirect exact from="/dashboard" to="/dashboard/home" />
          <Route exact path="/dashboard/:page?/:id?" render={props => <Dashboard {...props}/>} />
          <Redirect from='/' to='/dashboard' />
        </Switch>

      </Router>

  );
}

export default App
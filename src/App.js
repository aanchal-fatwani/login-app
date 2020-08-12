import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./components/Login";
import Users from "./components/Users";
import UserInfo from "./components/UserInfo";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/users/:userId">
            <UserInfo />
          </Route>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;

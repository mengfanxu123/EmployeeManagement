import React, { Component } from "react";
import { Router, Route, Link as RouterLink, Switch } from "react-router-dom";
import "./App.css";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { createBrowserHistory } from "history";
import addEmployee from "./containers/addEmployee";
import Home from "./containers/Home";

export const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Button variant="contained">
              <Link component={RouterLink} to="/addEmployee">
                Add Employee
              </Link>
            </Button>
            <Button variant="contained">
              <Link component={RouterLink} to="/">
                Home
              </Link>
            </Button>
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route path="/addEmployee" component={addEmployee} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

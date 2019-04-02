import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import Signup from "./containers/signup";
import Dashboard from "./containers/dashboard";
//import Home from "./containers/home";
import PrivateRoute from "./PrivateRoute";
import { travelUserFetch } from "./actions";
const App = props => {
  const { store, history } = props;

  return (
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Switch>
            <PrivateRoute
              exact
              path="/"
              component={Dashboard}
              onEnter={store.dispatch(travelUserFetch())}
            />
            <Route exact path="/login" component={Signup} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;

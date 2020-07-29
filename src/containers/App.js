import React, { Component } from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { createStore } from "redux";
import AdminIndex from "containers/admin/adminIndex";
import Index from "containers/front/index";
import rootReducers from "redux/rootReducer";
import NotFound from "components/notFound/NotFound";
import Login from "components/user/login/login";
import Register from "components/user/register/register";
let store = createStore(rootReducers);
class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* NOTE: if the route is multiple(/admin/XXX), do not add "exact" */}
            <Route path="/admin" component={AdminIndex} />
            <Route path="/" exact component={Index} />
            {/* <Route render={() => <Redirect to="/" push />} /> */}
            <Route component={NotFound} />
          </Switch>
        </Provider>
      </Router>
    );
  }
}
export default App;

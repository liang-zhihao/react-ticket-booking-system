import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createStore } from "redux";
import AdminIndex from "./components/admin/adminIndex/adminIndex";
import Index from "./components/index/index";
import "./index.css";
import rootReducers from "./redux/rootReducer";
import * as serviceWorker from "./serviceWorker";

let store = createStore(rootReducers);
ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Switch>
        <Route path="/admin" component={AdminIndex} />
        <Route path="/index" component={Index} />
        <Route path="/" component={Index} />
      </Switch>
    </Provider>
  </Router>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

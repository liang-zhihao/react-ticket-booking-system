import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import Index from "./components/index/index";
import * as serviceWorker from "./serviceWorker";
import Register from "./components/user/register/register";
import PostList from "./test/postList";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducers from "./redux/rootReducer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminIndex from "./components/admin/adminIndex/adminIndex";

let store = createStore(rootReducers);
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/admin" component={AdminIndex} />
        <Route path="/index" component={Index} />
        <Route path="/" component={Index} />
      </Switch>
    </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

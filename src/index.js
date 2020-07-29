import App from "containers/App";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import rootReducers from "./redux/rootReducer";
import * as serviceWorker from "./serviceWorker";
let store = createStore(rootReducers);
ReactDOM.render(
  <App/>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

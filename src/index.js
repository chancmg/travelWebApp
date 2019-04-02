import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/configureStore";
import { syncHistoryWithStore } from "react-router-redux";
import { history } from "./history";
const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const browserHistory = syncHistoryWithStore(history, store);

ReactDOM.render(
  <App store={store} history={browserHistory} />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

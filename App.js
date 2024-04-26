import React, { Component } from "react";
// import { Platform, StyleSheet, Text, View } from "react-native";

import { Provider } from "react-redux";
import configureStore from "./src/redux/configureStore";
const store = configureStore();

import Routes from "./src/Routes";
// import "./app.css";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

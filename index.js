/**
 * @format
 */

import { AppRegistry, Platform } from "react-native";
import App from "./App";
import { displayName, name } from "./app.json";

const appName = Platform.OS === "ios" ? name : displayName;

AppRegistry.registerComponent(appName, () => App);

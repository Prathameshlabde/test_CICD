import { combineReducers } from "redux";
import { routerReducer as router } from "react-router-redux";
import component from "./reducer/component";
import data from "./reducer/data";
export default combineReducers({
    router,
    component,
    data
});

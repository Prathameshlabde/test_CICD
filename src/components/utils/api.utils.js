import {
  API_HOST,
  APP_BASE_URL,
  APP_BASE_URL_METHOD,
} from "../../constants/app.constants";

function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"));
    }, ms);
    promise.then(resolve, reject);
  });
}

export function callApi(parameters) {
  let id, api, data;
  let dataMap = {
    id,
    api,
    data,
    isFetching: false,
    isError: false,
  };

  const finalLink = APP_BASE_URL + parameters.api.apiName;
  return timeout(
    60000,
    fetch(finalLink, {
      method: APP_BASE_URL_METHOD,
      headers: {
        // Accept: "application/json",
        // "Content-Type": "application/json",
        // "Content-Length": 416,
        // Host: "192.168.2.96"

        Accept: "application/json",
        Host: API_HOST,
        "Content-Length": 430,
        "Content-Type": "application/json",
      },
      body: parameters.api.body,
    })
  )
    .then((response) => response.json())
    .then((json) => {
      console.log("json = ", json);
      dataMap = {
        id: parameters.id,
        response: json,
        isFetching: false,
        isError: false,
      };
      return dataMap;
    })
    .catch(function(error) {
      console.log("error = ", error);
      dataMap = {
        id: parameters.id,
        response: error,
        isFetching: false,
        isError: true,
      };
      return dataMap;
    });
}

import { callApi, uploadCallApi } from "../components/utils/api.utils.js";

import {
  DATA_REQUEST,
  DATA_UPDATE,
  DATA_DELETE,
  DATA_ERROR,
  DATA_CLEAR
} from "../constants/action.constants.js";

function onRequest(apiData) {
  return { type: DATA_REQUEST, apiData };
}

function onUpdate(apiData) {
  return { type: DATA_UPDATE, apiData };
}
function onDelete(apiData) {
  return { type: DATA_DELETE, apiData };
}

function onError(apiData) {
  return { type: DATA_ERROR, apiData };
}

function onClear(apiData) {
  return { type: DATA_CLEAR, apiData };
}

export function requestData(parameters) {
  return function(dispatch) {
    return callApi(parameters).then(response => {
      if (response.isError === false) {
        return dispatch(onRequest(response));
      } else {
        return dispatch(onError(response));
      }
    });
  };
}

export function uploadData(parameters) {
  return function(dispatch) {
    return uploadCallApi(parameters).then(response => {
      if (response.isError === false) {
        return dispatch(onRequest(response));
      } else {
        return dispatch(onError(response));
      }
    });
  };
}

export function updateData(parameters) {
  return function(dispatch) {
    return callApi(parameters).then(response => {
      if (response.isError === false) {
        return dispatch(onUpdate(response));
      } else {
        return dispatch(onError(response));
      }
    });
  };
}

export function deleteData(parameters) {
  return function(dispatch) {
    return callApi(parameters).then(response => {
      if (response.isError === false) {
        return dispatch(onDelete(response));
      } else {
        return dispatch(onError(response));
      }
    });
  };
}

export function clearData(parameters) {
  return function(dispatch) {
    dispatch(onClear(parameters.id, parameters));
  };
}

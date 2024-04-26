import { LOG_LIMIT_STR } from "./app.constants";

export const INTERNAL_SERVER_ERROR = {
  message: "Internal Server Error, Please try again.",
  internetConnectionMessage: "Please check your internet connection",
  tryAgain: "Please try again after some time"
};

export const SERVER_STORAGE = {
  successMsg: "Data has been saved successfully at server",
  failureMsg: "Data failed to save at server, Please try again.",
  waitMsg: "Please wait."
};

export const AMPLI_CONNCETION_DLGS = {
  deviceScan: "Please scan the devices again",
  turnOnBluetooth: "Please turn on the Bluetooth",
  pairedFailed: "This BLE cannot be paired",
  deniedBond: "Bond request has been denied"
};

export const BLE_CONNECTION = {
  notConnected: "BLE is not connected.",
  goToSettingQ: "Go to settings"
};

export const LOCAL_STORAGE = {
  addSuccessMsg: "Stored to the local database successfully.",
  addFailureMsg: "Something went wrong, Please try again.",
  deleteSuccessMsg: "Removed data from the local database successfully.",
  deleteFailureMsg: "Something went wrong, Please try again."
};

export const WEBSERVICE_DIALOGS = {
  saveSuccessMsg: "Saved Successfuly",
  saveSuccessMsg1: "Saved Successfully"
};

export const LOG_TEXTFIELD_DIALOGS = {
  msg: "Enter a number between 1 to " + LOG_LIMIT_STR,
  textFieldTitle: "Recent number of log entries",
  resultBtnText: "Get Results"
};

export const REFRESH_DIALOG = {
  title: "Some data could not be fetched from the BLE",
  msg: "please click on refresh icon to get it."
};

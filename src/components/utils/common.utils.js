import {
  PARAM_SEPERATOR,
  TIMER_LOG_ID,
  JTR_DRV_COUNTER_ID,
  JTR_FIN_COUNTER_ID,
  COUNTER_LOG_ID,
  JOULES_COUNTER_ID,
  AMPLIFIER_INFORMATION_ID,
  POWER_MONITORING_ID,
  CURRENT_MONITORING_ID,
  VOLTAGE_MONITORING_ID
} from "../../constants/app.constants";
import { Alert, Linking, PermissionsAndroid, Platform } from "react-native";
import { showToast } from "../../widgets/snackbar.utils";
import {
  SERVER_STORAGE,
  REFRESH_DIALOG
} from "../../constants/dialog.constants";
import _ from "lodash";
const Entities = require("html-entities").XmlEntities;

export function createDataString(dataArray) {
  let dataString = "";
  for (let i = 0; i < dataArray.length; i++) {
    dataString = dataString + dataArray[i] + PARAM_SEPERATOR;
  }
  return dataString;
}

export function showAlert(title, msg, onPressFunction) {
  Alert.alert(
    title,
    msg,
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: onPressFunction
      }
    ],
    {
      cancelable: false
    }
  );
}

export function showAlertWithOkCancelAction(
  title,
  msg,
  onCancelPress,
  onOkPress
) {
  Alert.alert(
    title,
    msg,
    [
      {
        text: "Cancel",
        style: "cancel",
        onPress: onCancelPress
      },
      {
        text: "OK",
        onPress: onOkPress
      }
    ],
    {
      cancelable: false
    }
  );
}

export function showAlertOnlyOK(title, msg, onPressFunction) {
  Alert.alert(
    title,
    msg,
    [
      {
        text: "OK",
        onPress: onPressFunction
      }
    ],
    {
      cancelable: false
    }
  );
}

export function showRefreshAlert() {
  showAlertOnlyOK(REFRESH_DIALOG.title, REFRESH_DIALOG.msg, null);
}

export function isResponse(response) {
  if (
    response &&
    response.apiData &&
    response.apiData.data &&
    response.apiData.data[0]
  ) {
    return true;
  } else {
    return false;
  }
}

export function validateWithRegex(str, regex) {
  // let regex = /^[0-9]+$/;
  if (str.match(regex)) {
    return true;
  } else {
    return false;
  }
}

export function validFlatlist(numberVal) {
  if (numberVal % 10 === 0) {
    return true;
  } else {
    return false;
  }
}

//old
// export function getValueFromResponseString(arr) {
//   let bytesView = new Uint8Array(arr);
//   let str = new TextDecoder().decode(bytesView);
//   let str2 = str.replace(/(\r\n|\n|\r)/gm, "");
//   return str2;
// }

//new 27-08-2019
export function getValueFromResponseString(arr) {
  let bytesView = new Uint8Array(arr);
  let str = bin2string(bytesView);
  let str2 = str.replace(/(\r\n|\n|\r)/gm, "");
  console.log("response from ble 22 = ", str2);
  return str2;
}

function bin2string(array) {
  let result = "";
  for (let i = 0; i < array.length; ++i) {
    result += String.fromCharCode(array[i]);
  }
  return result;
}

export function GetValueWithRegex(item) {
  const tempvalue = item.value;
  if (item.value) {
    let arr = tempvalue.match(item.validationRegex);
    if (arr) return arr[1];
    else {
      return "";
    }
  } else {
    return "";
  }
}

export function GetDecimalValueWithRegex(item) {
  const tempvalue = item.value;
  if (item.value) {
    let arr = tempvalue.match(item.validationRegex);
    if (arr) return parseInt(arr[1], 16).toString();
    else {
      return "";
    }
  } else {
    return "";
  }
}

export function navigateToIOSDeviceSetting() {
  Linking.canOpenURL("app-settings:")
    .then(supported => {
      if (!supported) {
        console.log("Can't handle settings url");
      } else {
        return Linking.openURL("app-settings:");
      }
    })
    .catch(err => console.error("An error occurred", err));
}

export function isAndroidLocationOn() {
  PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
  ).then(result => {
    if (result) {
      console.log("result = ", result);
      console.log("Permission is OK");
      return true;
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      ).then(result => {
        if (result) {
          console.log("User accept");
          return true;
        } else {
          console.log("User refuse");
          return false;
        }
      });
    }
  });
}

export function getNewJsonWithValue(jsonFile, valuesArr) {
  const finalArr = [];
  jsonFile.fields.map((item, index) => {
    item.value = valuesArr[index];
    finalArr.push(item);
  });
  return finalArr;
}

export function getObjFromFinalJsonArr(finalJsonArr, peripheral, deviceID) {
  let obj = {};

  finalJsonArr.forEach((element, index) => {
    console.log("element = ", element);
    console.log("element.validationRegex = ", element.validationRegex);
    obj[element.fieldName] = element.validationRegex
      ? GetValueWithRegex(element)
      : element.value;
  });

  // for (let i = 0; i < finalJsonArr.length; i++) {
  //   console.log("finalJsonArr[i] = ", finalJsonArr[i]);
  //   console.log(
  //     "finalJsonArr[i].validationRegex = ",
  //     finalJsonArr[i].validationRegex
  //   );
  //   obj[finalJsonArr[i].fieldName] = finalJsonArr[i].validationRegex
  //     ? GetValueWithRegex(finalJsonArr[i])
  //     : finalJsonArr[i].value;
  // }
  obj["deviceID"] = deviceID;
  obj["bleSerial"] = peripheral.id ? peripheral.id : "";
  return obj;
}

export function getObjArrFromFinalLogDataArr(
  LogDataWithValues,
  peripheral,
  deviceID = "",
  finalJsonArr
) {
  console.log("LogDataWithValues before = ", LogDataWithValuesTemp);

  let LogDataWithValuesTemp = _.cloneDeep(LogDataWithValues);
  let finalJsonArrTemp = _.cloneDeep(finalJsonArr);

  console.log("LogDataWithValuesTemp before = ", LogDataWithValuesTemp);

  LogDataWithValuesTemp.map(parentItem => {
    finalJsonArrTemp.map(childItem => {
      parentItem.push(childItem);
    });
  });

  console.log("LogDataWithValues after = ", LogDataWithValues);
  console.log("LogDataWithValuesTemp after = ", LogDataWithValuesTemp);

  let objArr = [];

  LogDataWithValuesTemp.map(parentItem => {
    let obj = {};
    parentItem.map(childItem => {
      obj[childItem.fieldName] = childItem.validationRegex
        ? GetValueWithRegex(childItem)
        : childItem.value;
    });
    // console.log("peripheral.id", peripheral.id);
    obj["deviceID"] = deviceID;
    obj["bleSerial"] = peripheral.id ? peripheral.id : "";
    objArr.push(obj);
  });
  const finalObj = { logEntries: objArr };
  return finalObj;
}

export function sendMail(
  id,
  tempfinalJsonArr,
  jsonFile,
  deviceID,
  peripheral,
  tempLogDataWithValues = null,
  isCounterTimerLog = false,
  ErrorFaultLogStr = "",
  lastEntryNumber = ""
) {
  let finalJsonArr = _.cloneDeep(tempfinalJsonArr);
  let LogDataWithValues = _.cloneDeep(tempLogDataWithValues);

  const isBasicScreen =
    id === AMPLIFIER_INFORMATION_ID ||
    id === POWER_MONITORING_ID ||
    id === CURRENT_MONITORING_ID ||
    id === VOLTAGE_MONITORING_ID ||
    id === JOULES_COUNTER_ID;
  const isTimerScreen =
    id === TIMER_LOG_ID ||
    id === COUNTER_LOG_ID ||
    id === JTR_DRV_COUNTER_ID ||
    id === JTR_FIN_COUNTER_ID;

  console.log("Sending email finalJsonArr = ", finalJsonArr);
  console.log("Sending email LogDataWithValues = ", LogDataWithValues);
  console.log("Sending email finalJsonArr.length = ", finalJsonArr.length);
  console.log(
    "Sending email jsonFile.fields.length = ",
    jsonFile.fields.length
  );

  console.log("deviceID  = ", deviceID);
  console.log("peripheral after = ", peripheral);

  if (
    isCounterTimerLog &&
    isCounterTimerLog === true &&
    finalJsonArr.length > 0
  ) {
    console.log("deviceID11", deviceID);
    console.log("peripheral22", peripheral);

    callEmailLink(finalJsonArr, deviceID, peripheral, id);
  } else if (
    ErrorFaultLogStr &&
    ErrorFaultLogStr !== "" &&
    finalJsonArr.length > 0
  ) {
    console.log("deviceID333", deviceID);
    console.log("peripheral444", peripheral);
    if (ErrorFaultLogStr === "ERRORLOG") {
      if (LogDataWithValues) {
        LogDataWithValues.map((parentItem, index) => {
          finalJsonArr.push({
            label: "Error Log Number : " + (lastEntryNumber - index),
            value: ""
          });
          parentItem.map(child => {
            finalJsonArr.push({
              label: child.label,
              value: child.value
            });
          });
        });
      }
    } else {
      if (
        LogDataWithValues &&
        isEmpty(LogDataWithValues) === false &&
        isEmpty(finalJsonArr) === false
      ) {
        LogDataWithValues.map((parentItem, index) => {
          finalJsonArr.push({
            label: "Fault Log Number : " + (lastEntryNumber - index),
            value: ""
          });
          parentItem.map((child, index) => {
            finalJsonArr.push({
              label: child.label,
              value: child.value
            });
          });
        });
      }
    }
    callEmailLink(finalJsonArr, deviceID, peripheral, id);
  } else if (isBasicScreen || isTimerScreen) {
    console.log("deviceID555", deviceID);
    console.log("peripheral666", peripheral);
    console.log("finalJsonArr = ", finalJsonArr);
    callEmailLink(finalJsonArr, deviceID, peripheral, id);
  } else showToast(SERVER_STORAGE.waitMsg, false, true);
}

export function getNewLine() {
  if (Platform.OS === "ios") {
    return "\n";
  } else {
    return "<br/>";
  }
}

// function encodeStr(str) {
//   let buf = [];

//   for (let i = str.length - 1; i >= 0; i--) {
//     buf.unshift(["&#", str[i].charCodeAt(), ";"].join(""));
//   }

//   return buf.join("");
// }

function getRowLabel(row) {
  if (Platform.OS === "ios") {
    return row.label;
  } else {
    const entities = new Entities();
    let newDecodedStr = row.label;
    const LtEquals = entities.decode("&#8804;");
    const GtEquals = entities.decode("&#8805;");

    if (newDecodedStr.includes("<=")) {
      newDecodedStr = newDecodedStr.replace(/<=/g, LtEquals);
    }
    if (newDecodedStr.includes(">=")) {
      newDecodedStr = newDecodedStr.replace(/>=/g, GtEquals);
    }

    return newDecodedStr;
  }
}

export function getEmailTable(finalJsonArr, deviceID, peripheral, id) {
  const emailContent =
    `${finalJsonArr
      .map(row => {
        return (
          `${getRowLabel(row)}  ${
            id === JTR_DRV_COUNTER_ID ||
            id === JTR_FIN_COUNTER_ID ||
            id === COUNTER_LOG_ID ||
            (id === TIMER_LOG_ID && !isEmpty(row.validationRegex))
              ? GetValueWithRegex(row) //parseInt(GetValueWithRegex(row), 16).toString()
              : row.validationRegex
              ? GetValueWithRegex(row)
              : row.value
          }` +
          getNewLine() +
          " " +
          getNewLine()
        );
      })
      .join("")}` +
    getNewLine() +
    "  " +
    "deviceID : " +
    deviceID +
    getNewLine() +
    "  " +
    getNewLine() +
    "peripheralID : " +
    peripheral.id +
    getNewLine() +
    " " +
    getNewLine() +
    "Thanks and Regards";
  console.log("emailContent = ", emailContent);
  return emailContent;
}

export function callEmailLink(finalJsonArr, deviceID, peripheral, id) {
  Linking.openURL(
    `mailto:""?subject=Details &body= ${getEmailTable(
      finalJsonArr,
      deviceID,
      peripheral,
      id
    )}`
  );
}

export function isEmpty(value) {
  let isEmpty = false;

  if (isUndefined(value) || isNull(value)) {
    isEmpty = true;
  } else if (typeof value === "string" && value === "") {
    isEmpty = true;
  } else if (Array.isArray(value) && value.length === 0) {
    isEmpty = true;
  } else if (whatIsIt(value) === "Object" && Object.keys(value).length === 0) {
    isEmpty = true;
  }
  return isEmpty;
}

export function isUndefined(value) {
  return value === undefined;
}

export function isNull(value) {
  return value === null;
}

let stringConstructor = "test".constructor;
let arrayConstructor = [].constructor;
let objectConstructor = {}.constructor;

export function whatIsIt(object) {
  if (object === null) {
    return "null";
  } else if (object === undefined) {
    return "undefined";
  } else if (object.constructor === stringConstructor) {
    return "String";
  } else if (object.constructor === arrayConstructor) {
    return "Array";
  } else if (object.constructor === objectConstructor) {
    return "Object";
  } else if (typeof object === "number") {
    return "Number";
  } else {
    return "unknown";
  }
}

export function convertHexToTime(hexVal) {
  const num = parseInt(hexVal, 16);
  const myHours = Math.trunc(num / 3600);
  const minutes = (num - myHours * 3600) / 60;
  const myMin = Math.trunc(minutes);
  const seconds = (num - myHours * 3600) % 60;
  if (myHours >= 24) {
    const myDays = Math.trunc(myHours / 24);
    const hours1 = myHours - myDays * 24;
    return myDays + " Day(s) " + hours1 + "h " + myMin + "m " + seconds + "s";
  } else return myHours + "h " + myMin + "m " + seconds + "s";
}

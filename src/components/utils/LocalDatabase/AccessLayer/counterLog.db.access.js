import { getValuesForQuery, executeSql } from "../db.utils";
import { isEmpty } from "../../common.utils";
const fieldNames =
  "amplifierSerial,clPower,clOFFST,clSTOP,clSTOFF,clSTWAITFLT,clOPOFF,clOPST,clOFFFLT,clSTFLT,clOPFLT,clFLTOFF,clREQOFFOP,clFLTOVLD,clUCUPDATE,clFPGAUPDATE,deviceID,bleSerial";

export function addCounterLog(jsonData, peripheral, deviceID) {
  const values = getValuesForQuery(jsonData);
  const sqlQuery =
    "insert into CounterLog (" +
    fieldNames +
    ") Values('" +
    values +
    "','" +
    deviceID +
    "','" +
    peripheral.id +
    "');";

  return executeSql(sqlQuery)
    .then(response => {
      console.log("response in addCounterLog ", response);
      if (response) {
        return "added";
      } else {
        return "failToAdd";
      }
    })
    .catch(function() {
      return "failToAdd";
    });
}

export function deleteCounterLog(element) {
  let sqlQuery = "delete from CounterLog;";
  if (!isEmpty(element)) {
    sqlQuery =
      "delete from CounterLog WHERE PK_CounterLog=" +
      element.PK_CounterLog +
      ";";
  }
  return executeSql(sqlQuery)
    .then(response => {
      console.log("response from deleteCounterLog = ", response);
      if (response) {
        return "deleted";
      } else {
        return "failtodelete";
      }
    })
    .catch(function() {
      return "failtodelete";
    });
}

export function getCounterLogStorage() {
  const sqlQuery = "select PK_CounterLog," + fieldNames + " from CounterLog;";
  return executeSql(sqlQuery)
    .then(response => {
      console.log("response getCounterLogStorage ", response);
      if (response.rows.length === 0) {
        return null;
      } else {
        console.log("response.rows.raw ", response.rows.raw());
        return response.rows.raw();
      }
    })
    .catch(function() {
      return null;
    });
}

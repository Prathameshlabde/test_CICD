import { getValuesForQuery, executeSql } from "../db.utils";
import { isEmpty } from "../../common.utils";
const fieldNames =
  "amplifierSerial,peakForward,peakReflected,peakRFInput,averageForward,averageReflected,windowForward,windowReflected,windowInput,lastPeakForward,lastPeakReflected,lastPeakInput,deviceID,bleSerial";

export function addPowerMonitoring(jsonData, peripheral, deviceID) {
  const values = getValuesForQuery(jsonData);
  const sqlQuery =
    "insert into PowerMonitoring (" +
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
      // response.insertId = null
      if (response) {
        return "added";
      } else {
        return "failToAdd";
      }
    })
    .catch(function() {
      // console.log("Promise Rejected");
    });
}

export function deletePowerMonitoring(element) {
  let sqlQuery = "delete from PowerMonitoring;";
  if (!isEmpty(element)) {
    sqlQuery =
      "delete from PowerMonitoring WHERE PK_PowerMonitoringID=" +
      element.PK_PowerMonitoringID +
      ";";
  }
  return executeSql(sqlQuery)
    .then(response => {
      if (response) {
        return "deleted";
      } else {
        return "failtodelete";
      }
    })
    .catch(function() {
      // console.log("Promise Rejected");
    });
}

export function getPowerMonitoringStorage() {
  const sqlQuery =
    "select PK_PowerMonitoringID," + fieldNames + " from PowerMonitoring;";
  return executeSql(sqlQuery)
    .then(response => {
      if (response.rows.length === 0) {
        return null;
      } else {
        return response.rows.raw();
      }
    })
    .catch(function() {
      console.log("Promise Rejected");
    });
}

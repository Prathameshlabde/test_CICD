import { getValuesForQuery, executeSql } from "../db.utils";
import { isEmpty } from "../../common.utils";
const fieldNames =
  "amplifierSerial,finalDrain,driverDrainCurrent,'48VPreAmpDrain',deviceID,bleSerial";

export function addCurrentMonitoring(jsonData, peripheral, deviceID) {
  const values = getValuesForQuery(jsonData);
  const sqlQuery =
    "insert into CurrentMonitoring (" +
    fieldNames +
    ") Values('" +
    values +
    "','" +
    deviceID +
    "','" +
    peripheral.id +
    "');";

  console.log("sqlQuery current= ", sqlQuery);
  return executeSql(sqlQuery)
    .then(response => {
      // response.insertId = null
      console.log("response in addCurrentMonitoring ", response);
      if (response) {
        return "added";
      } else {
        return "failToAdd";
      }
    })
    .catch(function() {
      // console.log("Promise Rejected");
      console.log("error in addCurrentMonitoring ");
    });
}

export function deleteCurrentMonitoring(element) {
  let sqlQuery = "delete from CurrentMonitoring;";
  if (!isEmpty(element)) {
    sqlQuery =
      "delete from CurrentMonitoring WHERE PK_CurrentMonitoringID=" +
      element.PK_CurrentMonitoringID +
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

export function getCurrentMonitoringStorage() {
  const sqlQuery = "select * from CurrentMonitoring;";
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

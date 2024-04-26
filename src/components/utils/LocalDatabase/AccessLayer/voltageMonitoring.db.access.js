import { getValuesForQuery, executeSql } from "../db.utils";
import { isEmpty } from "../../common.utils";
const fieldNames =
  "amplifierSerial,VDD,'48V','15V','-15V','5V','-5V','3.3V','1.8V','1.0V',deviceID,bleSerial";

export function addVoltageMonitoring(jsonData, peripheral, deviceID) {
  const values = getValuesForQuery(jsonData);
  const sqlQuery =
    "insert into VoltageMonitoring (" +
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

export function deleteVoltageMonitoring(element) {
  let sqlQuery = "delete from VoltageMonitoring;";
  if (!isEmpty(element)) {
    sqlQuery =
      "delete from VoltageMonitoring WHERE PK_VoltageMonitoringID=" +
      element.PK_VoltageMonitoringID +
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

export function getVoltageMonitoringStorage() {
  const sqlQuery = "select * from VoltageMonitoring;";
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

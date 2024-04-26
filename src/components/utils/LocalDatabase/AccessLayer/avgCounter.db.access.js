import { getValuesForQuery, executeSql } from "../db.utils";
import { isEmpty } from "../../common.utils";
const fieldNames =
  "amplifierSerial,'NO RF detected','Y < 500','500 <=Y< 1500','1500 <=Y< 2500','2500 <=Y< 3500','3500 <=Y< 4500','Y >= 4500',deviceID,bleSerial";

export function addAvgCounter(jsonData, peripheral, deviceID) {
  const values = getValuesForQuery(jsonData);
  const sqlQuery =
    "insert into AvgCounter (" +
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

export function deleteAvgCounter(element) {
  let sqlQuery = "delete from AvgCounter;";
  if (!isEmpty(element)) {
    sqlQuery =
      "delete from AvgCounter WHERE PK_AvgCounterID=" +
      element.PK_AvgCounterID +
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

export function getAvgCounterStorage() {
  const sqlQuery = "select * from AvgCounter;";
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

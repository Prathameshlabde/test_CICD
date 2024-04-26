import { getDecimalValuesForQuery, executeSql } from "../db.utils";
import { isEmpty } from "../../common.utils";
const fieldNames = "amplifierSerial,joules,microJoules,deviceID,bleSerial";

export function addJoulesCounter(jsonData, peripheral, deviceID) {
  const values = getDecimalValuesForQuery(jsonData);
  const sqlQuery =
    "insert into JoulesCounter (" +
    fieldNames +
    ") Values('" +
    values +
    "','" +
    deviceID +
    "','" +
    peripheral.id +
    "');";

  console.log("sqlQuery in addJoulesCounter = ", sqlQuery);
  return executeSql(sqlQuery)
    .then(response => {
      // response.insertId = null
      console.log("response = ", response);
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

export function deleteJoulesCounter(element) {
  let sqlQuery = "delete from JoulesCounter;";
  if (!isEmpty(element)) {
    sqlQuery =
      "delete from JoulesCounter WHERE PK_JoulesCounterID=" +
      element.PK_JoulesCounterID +
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

export function getJoulesCounterStorage() {
  const sqlQuery = "select * from JoulesCounter;";
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

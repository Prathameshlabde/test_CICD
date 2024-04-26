import { getLogValuesForQuery, executeSql } from "../db.utils";
const fieldNames =
  "elData,amplifierSerial,elStatus,elTotalNumberOfLogs,deviceID,bleSerial";
export function addErrorLog(obj) {
  const values = getLogValuesForQuery(obj);
  const sqlQuery =
    "insert into ErrorLog (" + fieldNames + ") Values('" + values + "');";
  console.log("sqlQuery = ", sqlQuery);
  return executeSql(sqlQuery)
    .then(response => {
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

export function deleteErrorLog() {
  const sqlQuery = "delete from ErrorLog;";
  return executeSql(sqlQuery)
    .then(response => {
      console.log("response from deleteAmplifierInfo = ", response);
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

export function getErrorLogStorage() {
  const sqlQuery = "select " + fieldNames + " from ErrorLog;";
  return executeSql(sqlQuery)
    .then(response => {
      console.log("response getErrorLogStorage ", response);
      if (response.rows.length === 0) {
        return null;
      } else {
        console.log("response.rows.raw ", response.rows.raw());
        return response.rows.raw();
      }
    })
    .catch(function() {
      console.log("Promise Rejected");
    });
}

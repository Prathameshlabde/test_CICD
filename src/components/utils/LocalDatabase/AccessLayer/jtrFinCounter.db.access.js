import { getDecimalValuesForQuery, executeSql } from "../db.utils";
import { isEmpty } from "../../common.utils";
const fieldNames =
  "amplifierSerial,'Z < 5.0','5.0 <=Z< 15.0','15.0 <=Z< 25.0','25.0 <=Z< 35.0','35.0 <=Z< 45.0','45.0 <=Z< 55.0','55.0 <=Z< 65.0','65.0 <=Z< 75.0','75.0 <=Z< 85.0','85.0 <=Z< 95.0','95.0 <=Z< 105.0','105.0 <= Z',deviceID,bleSerial";

export function addJtrFinCounter(jsonData, peripheral, deviceID) {
  const values = getDecimalValuesForQuery(jsonData);

  const sqlQuery =
    "insert into JtrFinCounter (" +
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

export function deleteJtrFinCounter(element) {
  let sqlQuery = "delete from JtrFinCounter;";
  if (!isEmpty(element)) {
    sqlQuery =
      "delete from JtrFinCounter WHERE PK_JtrFinCounterID=" +
      element.PK_JtrFinCounterID +
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

export function getJtrFinCounterStorage() {
  const sqlQuery = "select * from JtrFinCounter;";
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

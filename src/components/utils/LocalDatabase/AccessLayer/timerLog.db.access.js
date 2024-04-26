import { getValuesForQuery, executeSql } from "../db.utils";
import { isEmpty } from "../../common.utils";
const fieldNames =
  "amplifierSerial,tlPOWERED,tlOFF,tlFAULT,tlSTANDBY,tlOPERATE,tlGATED,tlINIT,tlUPDATE,deviceID,bleSerial";

export function addTimerLog(jsonData, peripheral, deviceID) {
  const values = getValuesForQuery(jsonData);
  const sqlQuery =
    "insert into TimerLog (" +
    fieldNames +
    ") Values('" +
    values +
    "','" +
    deviceID +
    "','" +
    peripheral.id +
    "');";

  console.log("query = ", sqlQuery);
  return executeSql(sqlQuery)
    .then(response => {
      console.log("response = ", response);

      if (response) {
        return "added";
      } else {
        return "failToAdd";
      }
    })
    .catch(function(error) {
      console.log("Promise Rejected error = ", error);
      return "failToAdd";
    });
}

export function deleteTimerLog(element) {
  let sqlQuery = "delete from TimerLog;";
  if (!isEmpty(element)) {
    sqlQuery =
      "delete from TimerLog WHERE PK_TimerLog=" + element.PK_TimerLog + ";";
  }
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

export function getTimerLogStorage() {
  const sqlQuery = "select PK_TimerLog," + fieldNames + " from TimerLog;";
  return executeSql(sqlQuery)
    .then(response => {
      console.log("response getTimerLogStorage ", response);
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

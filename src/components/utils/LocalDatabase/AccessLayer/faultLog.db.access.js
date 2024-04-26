import { getLogValuesForQuery, executeSql } from "../db.utils";
const fieldNames =
  "flTimeStamp,flPacket1,flPacket2,flPacket3,flPacket4,amplifierSerial,faultStatus,flTotalNumberOfLogs,deviceID,bleSerial";
const fieldNamesWith2 =
  "flTimeStamp,flPacket1,flPacket2,amplifierSerial,faultStatus,flTotalNumberOfLogs,deviceID,bleSerial";
export function addFaultLog(obj, isShowAllPackets) {
  console.log("obj in addFaultLog = ", obj);
  const values = getLogValuesForQuery(obj);
  console.log("values in add fault log = ", values);
  let finalFieldNames = fieldNames;
  if (isShowAllPackets === false) finalFieldNames = fieldNamesWith2;
  const sqlQuery =
    "insert into FaultLog (" + finalFieldNames + ") Values('" + values + "');";
  console.log("sqlQuery in fault log = ", sqlQuery);
  return executeSql(sqlQuery)
    .then(response => {
      // response.insertId = null
      console.log("response in addFaultLog ", response);
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

export function deleteFaultLog() {
  const sqlQuery = "delete from FaultLog;";
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

export function getFaultLogStorage() {
  const sqlQuery = "select " + fieldNames + " from FaultLog;";
  console.log("sqlQuery in getlocalstorage fault log = ", sqlQuery);
  return executeSql(sqlQuery)
    .then(response => {
      console.log("response getFaultLogStorage ", response);
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

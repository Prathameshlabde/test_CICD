import { getValuesForQuery, executeSql } from "../db.utils";
import { isEmpty } from "../../common.utils";
const fieldNames =
  "cIBSWVersion,cIBSWRevision,cIBSWDate,cIBSWTime,amplifierType,amplifierSerial,amplifierStatus,amplifierDate,amplifierTime,pSUVersion,pSURevision,fPGAVersion,fPGARevision,deviceID,bleSerial";
export function addAmplifierInformation(jsonData, peripheral, deviceID) {
  const values = getValuesForQuery(jsonData);
  const sqlQuery =
    "insert into AmplifierInformation (" +
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

export function deleteAmplifierInformation(element) {
  let sqlQuery = "delete from AmplifierInformation;";
  if (!isEmpty(element)) {
    sqlQuery =
      "delete from AmplifierInformation WHERE PK_AmplifierInformationID=" +
      element.PK_AmplifierInformationID +
      ";";
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

export function getAmplifierInformationStorage() {
  const sqlQuery =
    "select PK_AmplifierInformationID," +
    fieldNames +
    " from AmplifierInformation;";
  return executeSql(sqlQuery)
    .then(response => {
      console.log("response getAmplifierInformationStorage ", response);
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

import { GetValueWithRegex, GetDecimalValueWithRegex } from "../common.utils";
const SQLite = require("react-native-sqlite-storage");

export function getValuesForQuery(jsonData) {
  let values = "";
  jsonData.map((item, index) => {
    if (jsonData.length - 1 === index) {
      if (item.validationRegex) values += GetValueWithRegex(item);
      else values += item.value;
    } else {
      if (item.validationRegex) values += GetValueWithRegex(item) + "','";
      else values += item.value + "','";
    }
  });
  return values;
}
//response =
// LogDataWithValues.map
export function getLogValuesForQuery(element) {
  let values = "";
  const valuesArr = Object.keys(element).map(function(key) {
    return element[key];
  });

  valuesArr.map((item, index) => {
    if (valuesArr.length - 1 === index) values += item;
    else values += item + "','";
  });
  return values;
}

//decimal conversion values

export function getDecimalValuesForQuery(jsonData) {
  let values = "";
  jsonData.map((item, index) => {
    if (jsonData.length - 1 === index) {
      if (item.validationRegex) values += GetValueWithRegex(item);
      else values += item.value; //parseInt(item.value, 16).toString();  /// no decimal...all hex values in database and API //do  not confuse with function name
    } else {
      if (item.validationRegex) {
        if (item.id === "amplifierSerial") {
          values += GetValueWithRegex(item) + "','";
        } else values += GetValueWithRegex(item) + "','";
      } else values += item.value + "','"; //parseInt(item.value, 16).toString() + "','"; no decimal...all hex values in database and API
    }
  });
  return values;
}

export function errorCB(err) {
  console.log("SQL Error: " + err);
}

export function successCB() {
  // console.log("SQL executed fine");
}

export function openCB() {
  console.log("Database OPENED .. check");
}

const db = SQLite.openDatabase(
  {
    name: "Analogic_2019",
    createFromLocation: "~Analogic_2019.sqlite"
  },
  openCB,
  errorCB
);

export function executeSql(sqlQuery) {
  return executeDb(db, sqlQuery);
}

function executeDb(dataBase, sqlQuery) {
  return new Promise((resolve, reject) => {
    dataBase.transaction(tx => {
      tx.executeSql(
        sqlQuery,
        [],
        (tx, response) => {
          let results = response;
          response = null;
          if (
            results.rows.length === 0 &&
            !results.insertId &&
            results.rowsAffected === 0
          ) {
            resolve(null);
          } else if (results.rowsAffected > 0) {
            resolve(results);
          } else if (results.insertId) {
            resolve(results);
          } else if (results.rows.length > 0) {
            resolve(results);
          }
        },
        null
      );
    });
  });
}

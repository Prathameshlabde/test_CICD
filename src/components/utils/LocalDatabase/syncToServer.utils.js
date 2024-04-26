import {
  ERROR_LOG_APIS,
  COUNTER_LOG_APIS,
  FAULT_LOG_APIS,
  AMPLIFIER_INFO_APIS,
  POWER_MONITORING_APIS,
  VOLTAGE_MONITORING_APIS,
  CURRENT_MONITORING_APIS,
  TIMER_LOG_APIS,
  PEAK_COUNTER_APIS,
  AVG_COUNTER_APIS,
  JTR_COUNTER_APIS,
  JOULES_COUNTER_APIS
} from "../../../constants/api.constants";
import {
  ERROR_LOG_ID,
  COUNTER_LOG_ID,
  FAULT_LOG_ID,
  AMPLIFIER_INFORMATION_ID,
  POWER_MONITORING_ID,
  VOLTAGE_MONITORING_ID,
  CURRENT_MONITORING_ID,
  TIMER_LOG_ID,
  PEAK_COUNTER_ID,
  AVG_COUNTER_ID,
  JTR_DRV_COUNTER_ID,
  JTR_FIN_COUNTER_ID,
  JOULES_COUNTER_ID
} from "../../../constants/app.constants";
import {
  getLocalStorage,
  deleteFromLocalStorage
} from "./BusinessLogic/businessLogic.layer";
import { storeToServerStorage } from "../webservice.utils";

const itemsToSync = [
  {
    id: AMPLIFIER_INFORMATION_ID,
    addServerApi: AMPLIFIER_INFO_APIS.addAmplifier,
    type: "object"
  },
  {
    id: POWER_MONITORING_ID,
    addServerApi: POWER_MONITORING_APIS.addPower,
    type: "object"
  },
  {
    id: VOLTAGE_MONITORING_ID,
    addServerApi: VOLTAGE_MONITORING_APIS.addVoltage,
    type: "object"
  },
  {
    id: CURRENT_MONITORING_ID,
    addServerApi: CURRENT_MONITORING_APIS.addCurrent,
    type: "object"
  },
  {
    id: COUNTER_LOG_ID,
    addServerApi: COUNTER_LOG_APIS.addCounterLog,
    type: "object"
  },
  {
    id: TIMER_LOG_ID,
    addServerApi: TIMER_LOG_APIS.addTimerLog,
    type: "object"
  },
  {
    id: ERROR_LOG_ID,
    addServerApi: ERROR_LOG_APIS.addErrorLog,
    type: "array"
  },
  {
    id: FAULT_LOG_ID,
    addServerApi: FAULT_LOG_APIS.addFaultLog,
    type: "array"
  },
  {
    id: PEAK_COUNTER_ID,
    addServerApi: PEAK_COUNTER_APIS.addPeakCounter,
    type: "object"
  },
  {
    id: AVG_COUNTER_ID,
    addServerApi: AVG_COUNTER_APIS.addAvgCounter,
    type: "object"
  },
  {
    id: JTR_DRV_COUNTER_ID,
    addServerApi: JTR_COUNTER_APIS.addDrvJtrCounter,
    type: "object"
  },
  {
    id: JTR_FIN_COUNTER_ID,
    addServerApi: JTR_COUNTER_APIS.addFinJtrCounter,
    type: "object"
  },
  {
    id: JOULES_COUNTER_ID,
    addServerApi: JOULES_COUNTER_APIS.addJoulesCounter,
    type: "object"
  }
];

export function syncToServer(requestData) {
  itemsToSync.map((item, index) => {
    if (item.type === "array") {
      executeDbTaskArr(item.id, item.addServerApi, requestData);
    } else if (item.type === "object") {
      executeDbTaskObj(item.id, item.addServerApi, requestData);
    }
  });
}

export function executeDbTaskArr(id, addServerApi, requestData) {
  getLocalStorage(id).then(responseArr => {
    if (responseArr && responseArr.length > 0) {
      console.log("responseArr All:-", responseArr);
      storeToServerStorage(
        { logEntries: responseArr },
        id,
        { requestData },
        addServerApi
      ).then(response => {
        if (response && response.isSuccess === true) {
          deleteFromLocalStorage(id).then(response => {
            console.log("Local Storage is Cleaned");
          });
        }
      });
    }
  });
}

export function executeDbTaskObj(id, addServerApi, requestData) {
  getLocalStorage(id).then(responseArr => {
    console.log("responseArr obj:-", responseArr);
    if (responseArr && responseArr.length > 0) {
      responseArr.forEach(element => {
        console.log("element :-", element);
        storeToServerStorage(element, id, { requestData }, addServerApi).then(
          response => {
            if (response && response.isSuccess === true) {
              console.log("Need to delete row by id");
              deleteFromLocalStorage(id, element).then(response => {});
            }
          }
        );
      });
    }
  });
}

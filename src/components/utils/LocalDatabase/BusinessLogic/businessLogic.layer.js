import {
  AMPLIFIER_INFORMATION_ID,
  POWER_MONITORING_ID,
  CURRENT_MONITORING_ID,
  VOLTAGE_MONITORING_ID,
  COUNTER_LOG_ID,
  ERROR_LOG_ID,
  FAULT_LOG_ID,
  TIMER_LOG_ID,
  PEAK_COUNTER_ID,
  AVG_COUNTER_ID,
  JTR_DRV_COUNTER_ID,
  JTR_FIN_COUNTER_ID,
  JOULES_COUNTER_ID
} from "../../../../constants/app.constants";
import {
  getAmplifierInformationStorage,
  deleteAmplifierInformation,
  addAmplifierInformation
} from "../AccessLayer/amplifierInfo.db.access";

import {
  addCurrentMonitoring,
  getCurrentMonitoringStorage,
  deleteCurrentMonitoring
} from "../AccessLayer/currentMonitoring.db.access";
import {
  addPowerMonitoring,
  getPowerMonitoringStorage,
  deletePowerMonitoring
} from "../AccessLayer/powerMonitoring.db.access";
import {
  addVoltageMonitoring,
  getVoltageMonitoringStorage,
  deleteVoltageMonitoring
} from "../AccessLayer/voltageMonitoring.db.access";
import {
  getCounterLogStorage,
  deleteCounterLog,
  addCounterLog
} from "../AccessLayer/counterLog.db.access";
import {
  addFaultLog,
  deleteFaultLog,
  getFaultLogStorage
} from "../AccessLayer/faultLog.db.access";
import {
  addErrorLog,
  deleteErrorLog,
  getErrorLogStorage
} from "../AccessLayer/errorLog.db.access";
import {
  addTimerLog,
  deleteTimerLog,
  getTimerLogStorage
} from "../AccessLayer/timerLog.db.access";
import {
  addPeakCounter,
  deletePeakCounter,
  getPeakCounterStorage
} from "../AccessLayer/peakCounter.db.access";
import {
  addAvgCounter,
  deleteAvgCounter,
  getAvgCounterStorage
} from "../AccessLayer/avgCounter.db.access";
import {
  addJtrFinCounter,
  deleteJtrFinCounter,
  getJtrFinCounterStorage
} from "../AccessLayer/jtrFinCounter.db.access";
import {
  addJoulesCounter,
  deleteJoulesCounter,
  getJoulesCounterStorage
} from "../AccessLayer/joulesCounter.db.access";
import {
  getJtrDrvCounterStorage,
  addJtrDrvCounter,
  deleteJtrDrvCounter
} from "../AccessLayer/jtrDrvCounter.db.access";

export function addToLocalStorage(
  finalJsonArr,
  id,
  peripheral = "",
  deviceID = "",
  isShowAllPackets = ""
) {
  console.log("finalJsonArr, id in addToLocalStorage = ", finalJsonArr, id);
  switch (id) {
    case AMPLIFIER_INFORMATION_ID:
      return addAmplifierInformation(finalJsonArr, peripheral, deviceID).then(
        response => {
          return response;
        }
      );

    case POWER_MONITORING_ID:
      return addPowerMonitoring(finalJsonArr, peripheral, deviceID).then(
        response => {
          return response;
        }
      );

    case CURRENT_MONITORING_ID:
      return addCurrentMonitoring(finalJsonArr, peripheral, deviceID).then(
        response => {
          return response;
        }
      );

    case VOLTAGE_MONITORING_ID:
      return addVoltageMonitoring(finalJsonArr, peripheral, deviceID).then(
        response => {
          return response;
        }
      );

    case FAULT_LOG_ID:
      return addFaultLog(finalJsonArr, isShowAllPackets).then(response => {
        return response;
      });
    case ERROR_LOG_ID:
      return addErrorLog(finalJsonArr).then(response => {
        return response;
      });
    case COUNTER_LOG_ID:
      return addCounterLog(finalJsonArr, peripheral, deviceID).then(
        response => {
          return response;
        }
      );
    case TIMER_LOG_ID:
      return addTimerLog(finalJsonArr, peripheral, deviceID).then(response => {
        return response;
      });
    case PEAK_COUNTER_ID:
      return addPeakCounter(finalJsonArr, peripheral, deviceID).then(
        response => {
          return response;
        }
      );
    case AVG_COUNTER_ID:
      return addAvgCounter(finalJsonArr, peripheral, deviceID).then(
        response => {
          return response;
        }
      );

    case JTR_DRV_COUNTER_ID:
      return addJtrDrvCounter(finalJsonArr, peripheral, deviceID).then(
        response => {
          return response;
        }
      );
    case JTR_FIN_COUNTER_ID:
      return addJtrFinCounter(finalJsonArr, peripheral, deviceID).then(
        response => {
          return response;
        }
      );
    case JOULES_COUNTER_ID:
      return addJoulesCounter(finalJsonArr, peripheral, deviceID).then(
        response => {
          return response;
        }
      );

    default:
      break;
  }
}

export function deleteFromLocalStorage(id, element = "") {
  switch (id) {
    case AMPLIFIER_INFORMATION_ID:
      return deleteAmplifierInformation(element).then(response => {
        return response;
      });

    case POWER_MONITORING_ID:
      return deletePowerMonitoring(element).then(response => {
        return response;
      });

    case CURRENT_MONITORING_ID:
      return deleteCurrentMonitoring(element).then(response => {
        return response;
      });

    case VOLTAGE_MONITORING_ID:
      return deleteVoltageMonitoring(element).then(response => {
        return response;
      });

    case FAULT_LOG_ID:
      return deleteFaultLog().then(response => {
        return response;
      });
    case ERROR_LOG_ID:
      return deleteErrorLog().then(response => {
        return response;
      });
    case COUNTER_LOG_ID:
      return deleteCounterLog(element).then(response => {
        return response;
      });
    case TIMER_LOG_ID:
      return deleteTimerLog(element).then(response => {
        return response;
      });
    case PEAK_COUNTER_ID:
      return deletePeakCounter(element).then(response => {
        return response;
      });
    case AVG_COUNTER_ID:
      return deleteAvgCounter(element).then(response => {
        return response;
      });

    case JTR_DRV_COUNTER_ID:
      return deleteJtrDrvCounter(element).then(response => {
        return response;
      });
    case JTR_FIN_COUNTER_ID:
      return deleteJtrFinCounter(element).then(response => {
        return response;
      });
    case JOULES_COUNTER_ID:
      return deleteJoulesCounter(element).then(response => {
        return response;
      });
    default:
      break;
  }
}

export function getLocalStorage(id) {
  console.log("getLocalStorage id  = ", id);
  switch (id) {
    case AMPLIFIER_INFORMATION_ID:
      return getAmplifierInformationStorage().then(response => {
        return response;
      });

    case POWER_MONITORING_ID:
      return getPowerMonitoringStorage().then(response => {
        return response;
      });

    case CURRENT_MONITORING_ID:
      return getCurrentMonitoringStorage().then(response => {
        return response;
      });

    case VOLTAGE_MONITORING_ID:
      return getVoltageMonitoringStorage().then(response => {
        return response;
      });
    case FAULT_LOG_ID:
      return getFaultLogStorage().then(response => {
        return response;
      });
    case ERROR_LOG_ID:
      return getErrorLogStorage().then(response => {
        return response;
      });
    case COUNTER_LOG_ID:
      return getCounterLogStorage().then(response => {
        return response;
      });
    case TIMER_LOG_ID:
      return getTimerLogStorage().then(response => {
        return response;
      });
    case PEAK_COUNTER_ID:
      return getPeakCounterStorage().then(response => {
        return response;
      });
    case AVG_COUNTER_ID:
      return getAvgCounterStorage().then(response => {
        return response;
      });
    case JTR_DRV_COUNTER_ID:
      return getJtrDrvCounterStorage().then(response => {
        return response;
      });
    case JTR_FIN_COUNTER_ID:
      return getJtrFinCounterStorage().then(response => {
        return response;
      });
    case JOULES_COUNTER_ID:
      return getJoulesCounterStorage().then(response => {
        return response;
      });
    default:
      break;
  }
}

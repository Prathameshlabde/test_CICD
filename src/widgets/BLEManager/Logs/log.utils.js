import {
  COUNTER_LOG_ID,
  TIMER_LOG_ID,
  JTR_FIN_COUNTER_ID,
  JTR_DRV_COUNTER_ID,
  AMPLIFIER_INFORMATION_ID,
  CURRENT_MONITORING_ID,
  VOLTAGE_MONITORING_ID,
  POWER_MONITORING_ID,
  JOULES_COUNTER_ID,
  PEAK_COUNTER_ID,
  PEAK_TABLE_OLD_ARR,
  AVG_TABLE_OLD_ARR
} from "../../../constants/app.constants";
import { isEmpty } from "../../../components/utils/common.utils";
import _ from "lodash";
import {
  getAmplifierInformationJsonObjArr,
  getCurrentMonitoringJsonObjArr,
  getPowerMonitoringJsonObjArr,
  getVoltageMonitoringJsonObjArr,
  getJoulesCounterJsonObjArr,
  getTimerLogJsonObjArr,
  getCounterLogJsonObjArr,
  getJtrJsonObjArr
} from "../../../components/JSON/json.utils";

export function getSingleFLogArrP4() {
  return [
    {
      id: "flTimeStamp",
      label: "Fault record :",
      fieldName: "flTimeStamp",
      command: "FAULT? ", // command: "FAULT? 0005\r\n",
      packetNumber: "",
      validationRegex: "",
      value: "",
      showField: true
    },
    {
      id: "flPacket1",
      label: "Packet 1:",
      fieldName: "flPacket1",
      command: "FAULTDATA? ", // 05 1\r\n",  OG Command = "FAULTDATA? 05 1\r\n",
      packetNumber: " 1",
      validationRegex: "",
      value: "",
      showField: true
    },
    {
      id: "flPacket2",
      label: "Packet 2:",
      fieldName: "flPacket2",
      command: "FAULTDATA? ", //05 2\r\n",
      packetNumber: " 2",
      validationRegex: "",
      value: "",
      showField: true
    },
    {
      id: "flPacket3",
      label: "Packet 3:",
      fieldName: "flPacket3",
      command: "FAULTDATA? ", //05 3\r\n",
      packetNumber: " 3",
      validationRegex: "",
      value: "",
      showField: true
    },
    {
      id: "flPacket4",
      label: "Packet 4:",
      fieldName: "flPacket4",
      command: "FAULTDATA? ", //05 4\r\n",
      packetNumber: " 4",
      validationRegex: "",
      value: "",
      showField: true
    }
  ];
}

export function getSingleFLogArrP2() {
  return [
    {
      id: "flTimeStamp",
      label: "Fault record :",
      fieldName: "flTimeStamp",
      command: "FAULT? ", // command: "FAULT? 0005\r\n",
      packetNumber: "",
      validationRegex: "",
      value: "",
      showField: true
    },
    {
      id: "flPacket1",
      label: "Packet 1:",
      fieldName: "flPacket1",
      command: "FAULTDATA? ", // 05 1\r\n",  OG Command = "FAULTDATA? 05 1\r\n",
      packetNumber: " 1",
      validationRegex: "",
      value: "",
      showField: true
    },
    {
      id: "flPacket2",
      label: "Packet 2:",
      fieldName: "flPacket2",
      command: "FAULTDATA? ", //05 2\r\n",
      packetNumber: " 2",
      validationRegex: "",
      value: "",
      showField: true
    }
  ];
}

export function getSingleErrorLogEntryArr() {
  return [
    {
      id: "elData",
      label: "Data :",
      fieldName: "elData",
      command: "ERROR? ",
      packetNumber: "",
      validationRegex: "",
      value: "",
      showField: true
    }
  ];
}

export function getPeakJsonArr() {
  return [
    {
      id: "amplifierSerial",
      label: "Amplifier Serial :",
      fieldName: "amplifierSerial",
      value: "",
      showField: false
    },
    {
      id: "NO RF detected",
      label: "NO RF detected",
      fieldName: "NO RF detected",
      value: "",
      showField: false
    },
    {
      id: "Y < 500",
      label: "Y < 500",
      fieldName: "Y < 500",
      value: "",
      showField: false
    },
    {
      id: "500 <=Y< 1500",
      label: "500 <=Y< 1500",
      fieldName: "500 <=Y< 1500",
      value: "",
      showField: false
    },
    {
      id: "1500 <=Y< 2500",
      label: "1500 <=Y< 2500",
      fieldName: "1500 <=Y< 2500",
      value: "",
      showField: false
    },
    {
      id: "2500 <=Y< 3500",
      label: "2500 <=Y< 3500:",
      fieldName: "2500 <=Y< 3500",
      value: "",
      showField: false
    },
    {
      id: "3500 <=Y< 4500",
      label: "3500 <=Y< 4500",
      fieldName: "3500 <=Y< 4500",
      value: "",
      showField: false
    },
    {
      id: "Y >= 4500",
      label: "Y >= 4500",
      fieldName: "Y >= 4500",
      value: "",
      showField: false
    }
  ];
}

export function getAvgJsonArr() {
  return [
    {
      id: "amplifierSerial",
      label: "Amplifier Serial :",
      fieldName: "amplifierSerial",
      value: "",
      showField: false
    },
    {
      id: "NO RF detected",
      label: "NO RF detected",
      fieldName: "NO RF detected",
      value: "",
      showField: false
    },
    {
      id: "Y < 50",
      label: "Y < 50",
      fieldName: "Y < 50",
      value: "",
      showField: false
    },
    {
      id: "50 <=Y< 150",
      label: "50 <=Y< 150",
      fieldName: "50 <=Y< 150",
      value: "",
      showField: false
    },
    {
      id: "150 <=Y< 250",
      label: "150 <=Y< 250",
      fieldName: "150 <=Y< 250",
      value: "",
      showField: false
    },
    {
      id: "250 <=Y< 350",
      label: "250 <=Y< 350:",
      fieldName: "250 <=Y< 350",
      value: "",
      showField: false
    },
    {
      id: "350 <=Y< 450",
      label: "350 <=Y< 450",
      fieldName: "350 <=Y< 450",
      value: "",
      showField: false
    },
    {
      id: "Y >= 450",
      label: "Y >= 450",
      fieldName: "Y >= 450",
      value: "",
      showField: false
    }
  ];
}

export function getJsonValuesArrForTimers(newJsonArr, valuesArr) {
  if (newJsonArr) {
    newJsonArr.forEach(item => {
      item["value"] = valuesArr[0] + valuesArr[1]; ///1st amplifier 2nd actual data string
    });
    console.log("newJsonArr timers", newJsonArr);
    return newJsonArr;
  } else {
    return [];
  }
}

export function getJsonValuesArrForBasicScreens(newJsonArr, junkRemovedStr) {
  if (newJsonArr) {
    newJsonArr.forEach(item => {
      item["value"] = junkRemovedStr;
    });
    console.log("newJsonArr basic", newJsonArr);
    return newJsonArr;
  } else {
    return [];
  }
}

export function getJsonObjArr(id) {
  switch (id) {
    case COUNTER_LOG_ID:
      return getCounterLogJsonObjArr();
    case TIMER_LOG_ID:
      return getTimerLogJsonObjArr();
    case JTR_FIN_COUNTER_ID:
      return getJtrJsonObjArr();
    case JTR_DRV_COUNTER_ID:
      return getJtrJsonObjArr();
    case AMPLIFIER_INFORMATION_ID:
      return getAmplifierInformationJsonObjArr();
    case CURRENT_MONITORING_ID:
      return getCurrentMonitoringJsonObjArr();
    case VOLTAGE_MONITORING_ID:
      return getVoltageMonitoringJsonObjArr();
    case POWER_MONITORING_ID:
      return getPowerMonitoringJsonObjArr();
    case JOULES_COUNTER_ID:
      return getJoulesCounterJsonObjArr();

    default:
      break;
  }
}

export function transpose(a) {
  return Object.keys(a[0]).map(function(c) {
    return a.map(function(r) {
      return parseInt(r[c], 16).toString(); //aditya
    });
  });
}

export function createTableData(valuesArrTemp, id) {
  const valuesArr = _.cloneDeep(valuesArrTemp);
  let tableData = [];
  let allColumnsData = [];
  let newTransposeArr = [];
  if (valuesArr) {
    valuesArr.shift();
    allColumnsData = valuesArr;
    let finalArr = [];
    if (allColumnsData) {
      finalArr = [];
      allColumnsData.forEach(element => {
        const arr = element.match(/.{1,9}/g);
        finalArr.push(arr);
      });
      newTransposeArr = transpose(finalArr);

      if (newTransposeArr) {
        const peakData = _.cloneDeep(PEAK_TABLE_OLD_ARR);
        const averageData = _.cloneDeep(AVG_TABLE_OLD_ARR);
        tableData = id === PEAK_COUNTER_ID ? peakData : averageData;

        tableData.forEach((element, index) => {
          if (index != 0) {
            if (!isEmpty(newTransposeArr[index - 1]))
              newTransposeArr[index - 1].forEach(insideEle => {
                element.push(
                  !isEmpty(insideEle) ? parseInt(insideEle, 16).toString() : ""
                );
              });
          }
        });
      }
    }
  }

  finalArr = [];

  return {
    tableData,
    allColumnsData,
    newTransposeArr
  };
}

export function createJsonArrWithColumnData(
  id,
  allColumnsDataTemp,
  amplifierSerial
) {
  const allColumnsData = _.cloneDeep(allColumnsDataTemp);
  const tempJsonArr =
    id === PEAK_COUNTER_ID ? getPeakJsonArr() : getAvgJsonArr();
  let finalArr = [];
  tempJsonArr.forEach((element, index) => {
    if (index === 0) {
      element.value = amplifierSerial;
    } else {
      element.value = allColumnsData[index - 1];
    }
    finalArr.push(element);
  });
  return finalArr;
}

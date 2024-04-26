import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import {
  getNewJsonWithValue,
  sendMail,
  isEmpty,
  getObjArrFromFinalLogDataArr,
  showRefreshAlert
} from "../../components/utils/common.utils";
import { View, Keyboard, TouchableOpacity } from "react-native";
import {
  BLE_MANAGER_ID,
  BLE_CONNECTED_PERIPHERAL,
  MOBILE_UNIQUE_ID,
  DEVICE_ID,
  LOG_LIMIT
} from "../../constants/app.constants";
import {
  getTopContainer,
  getNewLogData,
  getTextFieldAndResultbutton,
  getFaultErrorLogFields,
  showBLEConnectionMessage,
  successLocalToast,
  failureLocalToast
} from "../../components/utils/ui.utils";
import { addToLocalStorage } from "../../components/utils/LocalDatabase/BusinessLogic/businessLogic.layer";
import {
  SERVER_STORAGE,
  LOG_TEXTFIELD_DIALOGS
} from "../../constants/dialog.constants";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import Loader from "../Loader";
import { showToast } from "../snackbar.utils";
import NetInfo from "@react-native-community/netinfo";
import { storeToServerStorage } from "../../components/utils/webservice.utils";
import { navigateToSettings } from "../../components/utils/navigation.utils";
import { getSingleErrorLogEntryArr } from "./Logs/log.utils";
import { styles } from "../../styles/styles";
import { Buffer } from "buffer";
const transactionId = "monitor_battery";

class BLEErrorLogWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      errorMessage: "",
      errorDivColor: "",
      valuesArr: [],
      lock: false,
      finalDataString: "",
      isAllDataReceived: false,
      commandNumber: 0,
      ErrorLog: "",
      totalLogToDisplay: 3,
      currentLogIndex: 0,
      logData: [],
      logValuesData: []
    };

    NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
  }

  componentDidMount() {
    const { peripheralState, deviceIDState } = this.props;
    const item = peripheralState.get(BLE_CONNECTED_PERIPHERAL, "");
    const deviceID = deviceIDState.get(DEVICE_ID, "");
    const isBleSettupDone =
      item.manager && item.peripheral && item.singleCharacteristics;
    if (isBleSettupDone) {
      this.setState(
        {
          peripheral: item.peripheral,
          singleCharacteristics: item.singleCharacteristics,
          deviceID,
          manager: item.manager
        },
        () => {
          if (!isEmpty(item.singleCharacteristics)) {
            this.readQuary(item.singleCharacteristics);
            this.resetGenerateQuery();
          }
        }
      );
    } else {
      this.peripheralNotFound();
    }
  }

  componentWillUnmount() {
    const { manager } = this.state;
    if (manager) {
      manager.cancelTransaction(transactionId);
      NetInfo.isConnected.removeEventListener(
        "connectionChange",
        this.handleConnectionChange
      );
    }
  }

  resetGenerateQuery = () => {
    Keyboard.dismiss();
    let numericVal = parseInt(this.state.totalLogToDisplay, 10);
    this.setState({ totalLogToDisplay: numericVal }, () => {
      const { totalLogToDisplay } = this.state;
      if (numericVal && numericVal !== totalLogToDisplay) {
        this.setTextFieldError();
      } else if ((numericVal && numericVal > LOG_LIMIT) || numericVal <= 0) {
        this.setTextFieldError();
      } else if ((numericVal && numericVal < LOG_LIMIT) || numericVal > 0) {
        this.setState(
          {
            showLoader: false,
            errorMessage: "",
            errorDivColor: "",
            valuesArr: [],
            lock: false,
            finalDataString: "",
            isAllDataReceived: false,
            commandNumber: 0,
            ErrorLog: "",
            currentLogIndex: 0,
            logData: [],
            logValuesData: []
          },
          () => {
            this.generateData();
          }
        );
      } else this.setTextFieldError();
    });
  };

  generateData() {
    const { logData } = this.state;
    let logValuesData = [];
    if (logData.length === 0) {
      let newLogData = [];
      for (let i = 0; i < this.state.totalLogToDisplay; i++) {
        newLogData.push(getSingleErrorLogEntryArr());
        logValuesData.push([]);
      }
      this.setState({ logData: newLogData, logValuesData }, () => {
        this.refreshBLE();
      });
    }
  }

  setTextFieldError() {
    this.setState({ ErrorLog: LOG_TEXTFIELD_DIALOGS.msg });
  }

  handleConnectionChange = connectionInfo => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isConnected });
    });
  };

  refreshBLE() {
    const { peripheral } = this.state;
    // setTimeout(() => {
    //   const { isAllDataReceived } = this.state;
    //   if (!isAllDataReceived) {
    //     this.setState({ showLoader: false, lock: false }, () => {
    //       showRefreshAlert();
    //     });
    //   }
    // }, 60000);

    if (peripheral) {
      const { jsonFile } = this.props;
      this.setState(
        { lock: true, valuesArr: [], showLoader: true, isLoopOfLogs: false },
        () => {
          const firstCommand =
            jsonFile.fields[this.state.commandNumber].command;
          console.log("First Command:-", firstCommand);
          setTimeout(() => {
            this.writeCommands(firstCommand);
          }, 0);
        }
      );
    } else this.peripheralNotFound();
  }

  writeCommands(command) {
    console.log("passeed command :-", command);
    console.log("lock :-", this.state.lock);
    const { singleCharacteristics, lock, manager } = this.state;
    if (lock === true) {
      var commandData = Buffer.from(command).toString("base64");
      manager
        .writeCharacteristicWithResponseForDevice(
          singleCharacteristics.deviceID,
          singleCharacteristics.serviceUUID,
          singleCharacteristics.uuid,
          commandData
        )
        .then(res => {
          console.log("aftr write method :-", res);
        })
        .catch(error => {
          // console.log("error for write char = ", error);
          this.setLoaderOff();
        });
      // });
    }
  }

  readQuary(singleCharacteristics) {
    this.state.manager.monitorCharacteristicForDevice(
      singleCharacteristics.deviceID,
      singleCharacteristics.serviceUUID,
      singleCharacteristics.uuid,
      (error, characteristic) => {
        if (characteristic) {
          const resPonseStr = Buffer.from(
            characteristic.value,
            "base64"
          ).toString();
          this.setState(
            {
              finalDataString: this.state.finalDataString + resPonseStr
            },
            () => {
              const { finalDataString, isLoopOfLogs } = this.state;

              let junkRemovedStr = finalDataString.replace(
                /(\r\n|\n|\r)/gm,
                ""
              );
              console.log("junkRemovedStr = ", junkRemovedStr);

              if (isLoopOfLogs) {
                this.handleLoopOfLogsResponses(junkRemovedStr);
              } else {
                this.fireBasicJsonCommands(junkRemovedStr);
              }
            }
          );
        }
      },
      transactionId
    );
  }

  handleLoopOfLogsResponses(junkRemovedStr) {
    if (
      !isEmpty(junkRemovedStr) &&
      junkRemovedStr.includes(">") &&
      junkRemovedStr.split(">").length - 1 ===
        this.state.logData[this.state.currentLogIndex].length
    ) {
      const { currentLogIndex, totalLogToDisplay } = this.state;
      if (currentLogIndex < totalLogToDisplay - 1) {
        this.setState(
          {
            logValuesData: this.getLogValuesDataSlot(junkRemovedStr),
            currentLogIndex: currentLogIndex + 1,
            commandNumber: 0,
            finalDataString: ""
          },
          () => {
            this.fireSubErrorCommands();
          }
        );
      } else {
        this.setState(
          {
            logValuesData: this.getLogValuesDataSlot(junkRemovedStr),
            commandNumber: 0,
            currentLogIndex: 0,
            finalDataString: "",
            isAllDataReceived: true
          },
          () => {
            this.setLoaderOff();
          }
        );
      }
    } else {
      const countOfArrow = (junkRemovedStr.match(/>/g) || []).length;
      const { commandNumber, currentLogIndex, logData } = this.state;
      if (
        commandNumber < logData[currentLogIndex].length &&
        countOfArrow - 1 === commandNumber
      ) {
        this.setState(
          {
            commandNumber: this.state.commandNumber + 1
          },
          () => {
            this.fireSubErrorCommands();
          }
        );
      }
    }
  }

  getLogValuesDataSlot(junkRemovedStr) {
    let tempAr = junkRemovedStr.split(">");
    tempAr.splice(-1, 1);
    let logValuesData = this.state.logValuesData;
    logValuesData[this.state.currentLogIndex] = tempAr;
    return logValuesData;
  }

  getSubCommand() {
    const { valuesArr, currentLogIndex, logData, commandNumber } = this.state;
    const currentItem = logData[currentLogIndex][commandNumber];
    let command = "";
    const lastValInBasicRecvd = valuesArr[valuesArr.length - 1];
    finalInt =
      parseInt(lastValInBasicRecvd, 10) - parseInt(currentLogIndex, 10);
    if (currentItem.packetNumber && currentItem.packetNumber !== "") {
      command =
        currentItem.command +
        finalInt.toString() +
        currentItem.packetNumber +
        "\r\n";
    } else {
      command = currentItem.command + finalInt.toString() + "\r\n";
    }
    return command;
  }

  fireSubErrorCommands() {
    const command = this.getSubCommand();
    setTimeout(() => {
      this.writeCommands(command);
    }, 500);
  }

  fireBasicJsonCommands(junkRemovedStr) {
    const { jsonFile } = this.props;
    if (
      !isEmpty(junkRemovedStr) &&
      junkRemovedStr.includes(">") &&
      junkRemovedStr.split(">").length - 1 === jsonFile.fields.length
    ) {
      let tempAr = junkRemovedStr.split(">");
      tempAr.splice(-1, 1);
      this.setState(
        {
          valuesArr: tempAr,
          commandNumber: 0,
          finalDataString: "",
          isLoopOfLogs: true,
          lock: true
        },
        () => {
          this.fireSubErrorCommands();
        }
      );
    } else {
      const countOfArrow = (junkRemovedStr.match(/>/g) || []).length;
      const { commandNumber } = this.state;
      if (
        commandNumber < jsonFile.fields.length &&
        countOfArrow - 1 === commandNumber
      ) {
        this.writeBasicJCommand();
      }
    }
  }

  writeBasicJCommand() {
    const { jsonFile } = this.props;
    this.setState(
      {
        commandNumber: this.state.commandNumber + 1
      },
      () => {
        const { commandNumber } = this.state;
        if (commandNumber < jsonFile.fields.length) {
          const remainingCommand = jsonFile.fields[commandNumber].command;
          setTimeout(() => {
            this.writeCommands(remainingCommand);
          }, 500);
        }
      }
    );
  }

  setLoaderOff() {
    this.setState({
      showLoader: false,
      lock: false
    });
  }

  peripheralNotFound() {
    const { updateComponentState, navigation } = this.props;
    this.setState(
      {
        showLoader: false,
        lock: false
      },
      () => {
        showBLEConnectionMessage(() =>
          navigateToSettings({ updateComponentState }, navigation)
        );
      }
    );
  }

  sendToServer(finalJsonArr, LogDataWithValues) {
    const { lock, showLoader, logData, peripheral, deviceID } = this.state;
    const { id, requestData, addServerApi, jsonFile } = this.props;
    if (peripheral) {
      if (
        lock === false &&
        showLoader === false &&
        finalJsonArr.length === jsonFile.fields.length &&
        isEmpty(logData) === false &&
        isEmpty(LogDataWithValues) === false
      ) {
        const obj = getObjArrFromFinalLogDataArr(
          LogDataWithValues,
          peripheral,
          deviceID,
          finalJsonArr
        );
        this.setState({ lock: true, showLoader: true }, () => {
          NetInfo.isConnected
            .fetch()
            .then(isConnected => {
              if (isConnected === false) {
                let count = 0;
                obj.logEntries.forEach(element => {
                  console.log("element local = ", element);
                  addToLocalStorage(element, id).then(response => {
                    count++;
                    if (obj.logEntries.length === count) {
                      this.setState({ lock: false, showLoader: false }, () => {
                        if (response === "added") successLocalToast();
                        else failureLocalToast();
                      });
                    }
                  });
                });
              } else {
                storeToServerStorage(
                  obj,
                  id,
                  { requestData },
                  addServerApi
                ).then(response => {
                  this.setState({ lock: false, showLoader: false }, () => {
                    if (response && response.isSuccess === true) {
                      showToast(SERVER_STORAGE.successMsg, false, false, 2000);
                    } else {
                      showToast(SERVER_STORAGE.failureMsg, true, false, 2000);
                    }
                  });
                });
              }
            })
            .catch(error => {
              this.setState({ lock: false, showLoader: false });
            });
        });
      } else showToast(SERVER_STORAGE.waitMsg, false, true);
    } else this.peripheralNotFound();
  }

  render() {
    const {
      showLoader,
      valuesArr,
      totalLogToDisplay,
      ErrorLog,
      logData,
      logValuesData,
      deviceID,
      peripheral
    } = this.state;
    const { jsonFile, id } = this.props;
    const finalJsonArr = getNewJsonWithValue(jsonFile, valuesArr);
    const LogDataWithValues = getNewLogData(logValuesData, logData, valuesArr);
    return (
      <View style={styles.FLBottomContainer}>
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <View>
            {getTopContainer(
              this.resetGenerateQuery,
              () =>
                sendMail(
                  id,
                  finalJsonArr,
                  jsonFile,
                  deviceID,
                  peripheral,
                  LogDataWithValues,
                  false, //isCounterTimerLog false
                  "ERRORLOG", // ErrorFaultLogStr string,
                  valuesArr[valuesArr.length - 1]
                ),
              () => this.sendToServer(finalJsonArr, LogDataWithValues)
            )}
          </View>
          {getTextFieldAndResultbutton(
            ErrorLog,
            totalLogToDisplay,
            text => this.setState({ totalLogToDisplay: text }),
            this.resetGenerateQuery
          )}
        </TouchableOpacity>
        {showLoader === true ? <Loader showLoader={showLoader} /> : null}
        {getFaultErrorLogFields(
          finalJsonArr,
          valuesArr,
          jsonFile,
          logValuesData,
          logData,
          LogDataWithValues,
          true,
          id
        )}
      </View>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  const { component } = state;
  return {
    peripheralState: component.get(BLE_MANAGER_ID, Map()),
    deviceIDState: component.get(MOBILE_UNIQUE_ID, Map())
  };
}

export default connect(mapStateToProps, {
  updateComponentState,
  requestData
})(BLEErrorLogWidget);

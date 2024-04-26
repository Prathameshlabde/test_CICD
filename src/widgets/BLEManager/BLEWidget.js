import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import {
  getNewJsonWithValue,
  sendMail,
  getObjFromFinalJsonArr,
  showRefreshAlert,
  isEmpty
} from "../../components/utils/common.utils";
import { View, ScrollView, Platform } from "react-native";
import {
  BLE_MANAGER_ID,
  BLE_CONNECTED_PERIPHERAL,
  MOBILE_UNIQUE_ID,
  DEVICE_ID,
  JOULES_COUNTER_ID,
  AMPLIFIER_INFORMATION_ID,
  POWER_MONITORING_ID,
  CURRENT_MONITORING_ID,
  VOLTAGE_MONITORING_ID,
  TIMER_LOG_ID,
  COUNTER_LOG_ID,
  JTR_DRV_COUNTER_ID,
  JTR_FIN_COUNTER_ID
} from "../../constants/app.constants";
import {
  getFields,
  getTopContainerIcons,
  showBLEConnectionMessage,
  successLocalToast,
  failureLocalToast
} from "../../components/utils/ui.utils";
import { SERVER_STORAGE } from "../../constants/dialog.constants";
import { addToLocalStorage } from "../../components/utils/LocalDatabase/BusinessLogic/businessLogic.layer";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import Loader from "../Loader";
import { showToast } from "../snackbar.utils";
import NetInfo from "@react-native-community/netinfo";
import { storeToServerStorage } from "../../components/utils/webservice.utils";
import { navigateToSettings } from "../../components/utils/navigation.utils";
import { styles } from "../../styles/styles";
import { Buffer } from "buffer";
import {
  getJsonValuesArrForTimers,
  getJsonObjArr,
  getJsonValuesArrForBasicScreens
} from "./Logs/log.utils";
const transactionId = "monitor_battery";

class BLEWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      errorMessage: "",
      errorDivColor: "",
      valuesArr: [],
      finalJsonArr: [],
      lock: false,
      finalDataString: "",
      isAllDataReceived: false,
      commandNumber: 0
    };
    console.log("in constructor");
    NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
  }

  componentDidMount() {
    console.log("in did mount");
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
      manager.cancelTransaction(transactionId); //on tab unmount is not getting called
      NetInfo.isConnected.removeEventListener(
        "connectionChange",
        this.handleConnectionChange
      );
    }
  }

  resetGenerateQuery = () => {
    this.setState(
      {
        showLoader: false,
        isConnected: true,
        errorMessage: "",
        errorDivColor: "",
        valuesArr: [],
        finalJsonArr: [],
        lock: false,
        finalDataString: "",
        isAllDataReceived: false
      },
      () => {
        this.refreshBLE();
      }
    );
  };

  handleConnectionChange = connectionInfo => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isConnected });
    });
  };

  refreshBLE() {
    const { peripheral, commandNumber } = this.state;
    const { jsonFile } = this.props;

    setTimeout(() => {
      const { isAllDataReceived } = this.state;
      if (!isAllDataReceived) {
        this.setState({ showLoader: false, lock: false }, () => {
          showRefreshAlert();
        });
      }
    }, 60000);

    if (peripheral) {
      this.setState(
        { lock: true, valuesArr: [], finalJsonArr: [], showLoader: true },
        () => {
          const firstCommand = jsonFile.fields[commandNumber].command;
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
    console.log("in readQuary");
    this.state.manager.monitorCharacteristicForDevice(
      singleCharacteristics.deviceID,
      singleCharacteristics.serviceUUID,
      singleCharacteristics.uuid,
      (error, characteristic) => {
        console.log("error in read  = ", error);
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
              const { finalDataString } = this.state;
              console.log("finalDataString", finalDataString);
              const { jsonFile, id } = this.props;
              let junkRemovedStr = finalDataString.replace(
                /(\r\n|\n|\r)/gm,
                ""
              );

              console.log("junkRemovedStr normal widget = ", junkRemovedStr);
              const countOfArrow = (junkRemovedStr.match(/>/g) || []).length;

              if (
                !isEmpty(junkRemovedStr) &&
                junkRemovedStr.includes(">") &&
                junkRemovedStr.split(">").length - 1 === jsonFile.fields.length
              ) {
                let tempAr = junkRemovedStr.split(">");
                tempAr.splice(-1, 1);

                let finalJsonArr = [];
                const isTimerScreen =
                  id === TIMER_LOG_ID ||
                  id === COUNTER_LOG_ID ||
                  id === JTR_DRV_COUNTER_ID ||
                  id === JTR_FIN_COUNTER_ID;

                const isBasicScreen =
                  id === AMPLIFIER_INFORMATION_ID ||
                  id === POWER_MONITORING_ID ||
                  id === CURRENT_MONITORING_ID ||
                  id === VOLTAGE_MONITORING_ID ||
                  id === JOULES_COUNTER_ID;

                const newJsonArr = getJsonObjArr(id);

                if (isTimerScreen) {
                  finalJsonArr = getJsonValuesArrForTimers(newJsonArr, tempAr);
                } else if (isBasicScreen) {
                  finalJsonArr = getJsonValuesArrForBasicScreens(
                    newJsonArr,
                    junkRemovedStr
                  );
                }

                this.setState(
                  {
                    isAllDataReceived: true,
                    valuesArr: tempAr,
                    commandNumber: 0,
                    finalJsonArr
                  },
                  () => {
                    this.setLoaderOff();
                  }
                );
              } else {
                const { commandNumber } = this.state;
                if (
                  commandNumber < jsonFile.fields.length &&
                  countOfArrow - 1 === commandNumber
                ) {
                  this.fireNextCommand();
                }
              }
            }
          );
        }
      },
      transactionId
    );
  }

  fireNextCommand() {
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

  sendToServer(finalJsonArr) {
    const {
      lock,
      showLoader,
      peripheral,
      deviceID,
      valuesArr,
      isConnected,
      isAllDataReceived
    } = this.state;

    const { id, requestData, addServerApi } = this.props;
    if (peripheral) {
      if (
        lock === false &&
        showLoader === false &&
        isAllDataReceived &&
        isEmpty(valuesArr) === false
      ) {
        const obj = getObjFromFinalJsonArr(finalJsonArr, peripheral, deviceID);
        this.setState({ lock: true, showLoader: true }, () => {
          if (isConnected === false) {
            addToLocalStorage(finalJsonArr, id, peripheral, deviceID).then(
              response => {
                this.setState({ lock: false, showLoader: false }, () => {
                  if (response === "added") successLocalToast();
                  else failureLocalToast();
                });
              }
            );
          } else {
            storeToServerStorage(obj, id, { requestData }, addServerApi).then(
              response => {
                this.setState({ lock: false, showLoader: false }, () => {
                  if (response && response.isSuccess === true)
                    showToast(SERVER_STORAGE.successMsg, false, false, 2000);
                  else showToast(SERVER_STORAGE.failureMsg, true, false, 2000);
                });
              }
            );
          }
        });
      } else showToast(SERVER_STORAGE.waitMsg, false, true);
    } else this.peripheralNotFound();
  }

  render() {
    const { showLoader, deviceID, peripheral, finalJsonArr } = this.state;
    const { jsonFile, id } = this.props;
    return (
      <View style={styles.FLBottomContainer}>
        {getTopContainerIcons(
          this.resetGenerateQuery,
          () => sendMail(id, finalJsonArr, jsonFile, deviceID, peripheral),
          () => this.sendToServer(finalJsonArr)
        )}
        {showLoader === true ? <Loader showLoader={showLoader} /> : null}
        <ScrollView style={{ width: "100%", height: "100%" }}>
          {getFields(finalJsonArr, id)}
        </ScrollView>
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
})(BLEWidget);

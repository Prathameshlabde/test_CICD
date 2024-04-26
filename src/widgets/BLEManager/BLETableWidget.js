import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import {
  sendMail,
  getObjFromFinalJsonArr,
  isEmpty,
  showRefreshAlert
} from "../../components/utils/common.utils";
import { View } from "react-native";
import {
  BLE_MANAGER_ID,
  BLE_CONNECTED_PERIPHERAL,
  DEVICE_ID,
  MOBILE_UNIQUE_ID
} from "../../constants/app.constants";
import {
  getTopContainerIcons,
  showBLEConnectionMessage,
  successLocalToast,
  failureLocalToast
} from "../../components/utils/ui.utils";
import { SERVER_STORAGE } from "../../constants/dialog.constants";
import { navigateToSettings } from "../../components/utils/navigation.utils";
import { addToLocalStorage } from "../../components/utils/LocalDatabase/BusinessLogic/businessLogic.layer";
import { storeToServerStorage } from "../../components/utils/webservice.utils";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import Loader from "../Loader";
import { showToast } from "../snackbar.utils";
import NetInfo from "@react-native-community/netinfo";
import { createTableData, createJsonArrWithColumnData } from "./Logs/log.utils";
import { styles } from "../../styles/styles";
import CounterTable from "../CounterTable";
import { Buffer } from "buffer";
const transactionId = "monitor_battery";

class BLETableWidget extends Component {
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
      commandNumber: 0
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
    this.setState(
      {
        showLoader: false,
        isConnected: true,
        errorMessage: "",
        errorDivColor: "",
        valuesArr: [],
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
    const { peripheral } = this.state;
    setTimeout(() => {
      const { isAllDataReceived } = this.state;
      if (!isAllDataReceived) {
        this.setState({ showLoader: false, lock: false }, () => {
          showRefreshAlert();
        });
      }
    }, 60000);

    if (peripheral) {
      const { jsonFile } = this.props;
      this.setState({ lock: true, valuesArr: [], showLoader: true }, () => {
        const firstCommand = jsonFile.fields[this.state.commandNumber].command;
        setTimeout(() => {
          this.writeCommands(firstCommand);
        }, 0);
      });
    } else this.peripheralNotFound();
  }

  writeCommands(command) {
    console.log("passeed command :-", command);
    const { singleCharacteristics } = this.state;
    if (this.state.lock === true) {
      var commandData = Buffer.from(command).toString("base64");
      this.state.manager
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
              const { finalDataString } = this.state;
              const { jsonFile } = this.props;
              let junkRemovedStr = finalDataString.replace(
                /(\r\n|\n|\r)/gm,
                ""
              );

              console.log("junkRemovedStr = ", junkRemovedStr);
              const countOfArrow = (junkRemovedStr.match(/>/g) || []).length;

              if (
                !isEmpty(junkRemovedStr) &&
                junkRemovedStr.includes(">") &&
                junkRemovedStr.split(">").length - 1 === jsonFile.fields.length
              ) {
                let tempAr = junkRemovedStr.split(">");
                tempAr.splice(-1, 1);
                this.setState(
                  {
                    isAllDataReceived: true,
                    valuesArr: tempAr,
                    commandNumber: 0
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
      showLoader,
      peripheral,
      deviceID,
      lock,
      isConnected,
      isAllDataReceived
    } = this.state;
    const { id, requestData, addServerApi } = this.props;
    if (peripheral) {
      if (
        isAllDataReceived === true &&
        showLoader === false &&
        lock === false
      ) {
        const obj = getObjFromFinalJsonArr(finalJsonArr, peripheral, deviceID);
        console.log("obj in sendToServer = ", obj);
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
    const { showLoader, deviceID, peripheral, valuesArr } = this.state;
    const { jsonFile, id } = this.props;

    let tableData = [];
    let allColumnsData = [];
    let amplifierSerial = valuesArr[0];
    let finalJsonArr = [];
    let newTransposeArr = [];
    if (valuesArr.length === jsonFile.fields.length) {
      data = createTableData(valuesArr, id);
      tableData = data.tableData;
      allColumnsData = data.allColumnsData;
      newTransposeArr = data.newTransposeArr;
      console.log("tableData in render 22 = ", tableData);
      console.log("allColumnsData in render = ", allColumnsData);
      finalJsonArr = createJsonArrWithColumnData(
        id,
        allColumnsData,
        amplifierSerial
      );
      console.log("finalJsonArr in render = ", allColumnsData);
    }

    return (
      <View style={styles.FLBottomContainer}>
        {getTopContainerIcons(
          this.resetGenerateQuery,
          () =>
            sendMail(
              id,
              finalJsonArr,
              jsonFile,
              deviceID,
              peripheral,
              null,
              true //isCounterTimerLog
            ),
          () => this.sendToServer(finalJsonArr)
        )}
        {showLoader === true ? <Loader showLoader={showLoader} /> : null}
        {tableData &&
        valuesArr &&
        valuesArr.length === jsonFile.fields.length ? (
          <CounterTable
            tableData={tableData}
            newTransposeArr={newTransposeArr}
            id={id}
          />
        ) : null}
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
})(BLETableWidget);

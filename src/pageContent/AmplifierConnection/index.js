import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import {
  BLE_MANAGER_ID,
  BLE_CONNECTED_PERIPHERAL,
  MOBILE_UNIQUE_ID,
  DEVICE_ID
} from "../../constants/app.constants";
import {
  ActivityIndicator,
  View,
  BackHandler,
  Platform,
  PermissionsAndroid,
  ScrollView,
  AppState,
  TouchableOpacity
} from "react-native";
import {
  updateComponentState,
  deleteComponentState
} from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import BarHeader from "../../widgets/BarHeader.js";
import { styles } from "../../styles/styles";
import NetInfo from "@react-native-community/netinfo";
import { BluetoothStatus } from "react-native-bluetooth-status"; //For ios Only
import { getText } from "../../components/utils/ui.utils";
import LinearButton from "../../widgets/LinearButton";
import { Colors } from "../../components/utils/colors.utils";
import { showAlertOnlyOK, isEmpty } from "../../components/utils/common.utils";
import DeviceInfo from "react-native-device-info";
import { AMPLI_CONNCETION_DLGS } from "../../constants/dialog.constants";
import { BleManager } from "react-native-ble-plx";
import CheckBox from "../../widgets/CheckBox";

class AmplifierConnection extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      payload =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onBackButtonPressAndroid
        )
    );
    this.state = {
      showLoader: false,
      isError: false,
      PFS_AccountNo: "",
      isConnected: false,
      scanning: true,
      peripherals: [],
      appState: "",
      bluetoothState: "off",
      connectedPeripheralName: "",
      peripheralNames: [],
      connectedPeripheral: undefined,
      bleManager: undefined,
      isFilteredList: true
    };
    NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
  }

  handleConnectionChange = connectionInfo => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isConnected });
    });
  };

  updateBlueToothState() {
    this.state.bleManager.onStateChange(state => {
      if (Platform.OS === "android") {
        if (state === "PoweredOn") {
          this.setState({ bluetoothState: "On" }, () => {
            this.startScan();
          });
        } else {
          this.setState({ bluetoothState: "Off" }, () => {
            this.startScan();
          });
        }
      }
    }, true);
  }

  componentDidMount() {
    const {
      updateComponentState,
      deleteComponentState,
      peripheralState
    } = this.props;
    const deviceID = DeviceInfo.getUniqueId();
    updateComponentState(MOBILE_UNIQUE_ID, DEVICE_ID, deviceID);
    const item = peripheralState.get(BLE_CONNECTED_PERIPHERAL, undefined);

    this.setState(
      {
        bleManager: item && item.manager ? item.manager : new BleManager()
      },
      () => {
        this.updateBlueToothState();
        if (item && item.peripheral) {
          const peripheral = item.peripheral;
          console.log("peripheral :-", peripheral);
          peripheral
            .isConnected()
            .then(isConnected => {
              console.log("isConnected old :-", isConnected);
              if (isConnected) {
                peripheral.localName = peripheral.localName
                  ? peripheral.localName
                  : peripheral.name;
                const peripherals = [peripheral];
                const connectedPeripheralName = peripheral.localName
                  ? peripheral.localName
                  : peripheral.name;
                const peripheralNames = [connectedPeripheralName];

                this.setState({
                  isFilteredList: item.isFilteredList,
                  connectedPeripheralName,
                  peripherals,
                  peripheralNames,
                  connectedPeripheral: peripheral
                });
              }
            })
            .catch(error => {
              this.setState(
                {
                  showLoader: false,
                  scanning: false
                },
                () => {
                  this.disconnectBLE(peripheral);
                  deleteComponentState(BLE_MANAGER_ID);
                }
              );
            });
        } else {
          this.setState(
            {
              showLoader: true
            },
            () => {
              this.startActualScan();
            }
          );
        }

        this._willBlurSubscription = this.props.navigation.addListener(
          "willBlur",
          payload =>
            BackHandler.removeEventListener(
              "hardwareBackPress",
              this.onBackButtonPressAndroid
            )
        );

        AppState.addEventListener("change", this.handleAppStateChange);

        this.checkInitialBluetoothState();

        if (Platform.OS === "android" && Platform.Version >= 23) {
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
          ).then(result => {
            if (result) {
            } else {
              PermissionsAndroid.requestPermission(
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
              ).then(result => {
                if (result) {
                  // console.log("User accept");
                } else {
                  // console.log("User refuse");
                }
              });
            }
          });
        }
      }
    );
  }

  async checkInitialBluetoothState() {
    const isEnabled = await this.updateBluetoothStatus();
    if (!isEnabled) {
      this.requireBluetooth();
    }
  }

  async updateBluetoothStatus() {
    return new Promise(async (resolve, reject) => {
      try {
        const isEnabled = await BluetoothStatus.state();
        this.setState({ bluetoothState: isEnabled ? "On" : "Off" }, () => {
          this.startActualScan();
          if (!isEnabled) {
            const item = this.props.peripheralState.get(
              BLE_CONNECTED_PERIPHERAL,
              ""
            );
            if (item && item.peripheral) {
              this.disconnectBLE(item.peripheral);
              deleteComponentState(BLE_MANAGER_ID);
            }

            this.startScan();
          }
        });
        resolve(isEnabled);
      } catch (error) {
        // console.log("promise rejected = ", error);
        reject(error);
      }
    });
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    // NetInfo.isConnected.removeEventListener("connectionChange", () => {
    //   console.log("Removed...listner.connectionChange");
    // });
    // AppState.removeEventListener("change", () => {
    //   console.log("Removed...listner.change");
    // });
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.updateBluetoothStatus();
    }
    this.setState({ appState: nextAppState });
  };

  requireBluetooth() {
    this.callBluetoothAlert();
  }

  handleDisconnectedPeripheral = data => {
    const peripherals = this.state.peripherals;
    let newSet = [];
    peripherals.forEach(element => {
      let obj = element;
      if (element.id === data.peripheral) {
        obj.connected = false;
      }
      newSet.push(obj);
    });

    this.setState({ peripherals: newSet });
  };

  startScan() {
    const { bluetoothState, connectedPeripheral } = this.state;

    this.setState(
      {
        peripheralNames: [],
        peripherals: [],
        connectedPeripheral: undefined,
        scanning: false,
        connectedPeripheralName: "",
        showLoader: true
      },
      () => {
        if (connectedPeripheral) {
          this.disconnectBLE(connectedPeripheral);
        }
        if (this.state.scanning === false) {
          if (Platform.OS === "android") {
            this.startActualScan();
          } else {
            if (bluetoothState === "On") this.startActualScan();
            else this.callBluetoothAlert();
          }
        }
      }
    );
  }

  callBluetoothAlert() {
    showAlertOnlyOK(AMPLI_CONNCETION_DLGS.turnOnBluetooth, "", null);
  }

  startActualScan() {
    this.state.bleManager.startDeviceScan(null, null, (error, peripheral) => {
      this.setState({ scanning: true }, () => {
        let peripherals = this.state.peripherals;
        let peripheralNames = this.state.peripheralNames;
        const { isFilteredList } = this.state;

        if (isFilteredList) {
          if (
            peripheral &&
            peripherals.includes(peripheral) === false &&
            !isEmpty(peripheral.localName) &&
            peripheralNames.includes(peripheral.localName) === false &&
            peripheral.localName.includes("AN81")
          ) {
            console.log("isFilteredList = ", isFilteredList);
            console.log("AN push");
            peripherals.push(peripheral);
            peripheralNames.push(peripheral.localName);
            this.setState({ peripherals, peripheralNames });
          }
        } else {
          if (
            peripheral &&
            peripherals.includes(peripheral) === false &&
            !isEmpty(peripheral.localName) &&
            peripheralNames.includes(peripheral.localName) === false
          ) {
            console.log("normal push");
            peripherals.push(peripheral);
            peripheralNames.push(peripheral.localName);
            this.setState({ peripherals, peripheralNames });
          }
        }

        if (error) {
          console.log("error in startDeviceScan :-", error);
          this.startActualScan();
          return;
        }
      });
    });
  }

  stopScanning = () => {
    console.log("Scanning stopped");
    this.setState({
      showLoader: false,
      scanning: false
    });
    this.state.bleManager.stopDeviceScan();
  };

  connectBLE(peripheral) {
    this.setState(
      {
        showLoader: true
      },
      () => {
        this.state.bleManager
          .connectToDevice(peripheral.id, { timeout: 5000000 })
          .then(peripheral => {
            peripheral
              .discoverAllServicesAndCharacteristics()
              .then(peripheral => {
                peripheral.services().then(services => {
                  services.map((service, index) => {
                    if (
                      (index === 2 && Platform.OS === "android") || //bcz in Android three services are available
                      (index === 1 && Platform.OS === "ios") //bcz in iOS only two services are available
                    ) {
                      service.characteristics().then(characteristics => {
                        characteristics.map((singleCharacteristics, index) => {
                          if (index === 2) {
                            console.log("Connection Done:-OK");
                            this.setState(
                              {
                                connectedPeripheral: peripheral
                              },
                              () => {
                                this.updateDeviceForAppComponentState(
                                  peripheral,
                                  singleCharacteristics
                                );
                              }
                            );
                          }
                        });
                      });
                    }
                  });
                });
              });
          })
          .catch(error => {
            this.stopScanning();
            showAlertOnlyOK(AMPLI_CONNCETION_DLGS.pairedFailed, "", () => {
              this.setState({ showLoader: false });
            });
          });
      }
    );
  }

  updateDeviceForAppComponentState(peripheral, singleCharacteristics) {
    const { updateComponentState } = this.props;

    updateComponentState(BLE_MANAGER_ID, BLE_CONNECTED_PERIPHERAL, {
      peripheral,
      singleCharacteristics,
      manager: this.state.bleManager,
      isFilteredList: this.state.isFilteredList
    });

    this.setState({
      connectedPeripheralName: peripheral.localName
        ? peripheral.localName
        : peripheral.name,
      showLoader: false,
      scanning: false
    });
  }

  disconnectBLE(peripheral) {
    const { deleteComponentState } = this.props;
    console.log("peripheral.id :-", peripheral.id);

    deleteComponentState(BLE_MANAGER_ID);
    if (peripheral) {
      this.state.bleManager.cancelDeviceConnection(peripheral.id).then(() => {
        console.log("Entered 7");
        this.clearPeripheralAndLoader();
      });
    }
  }

  clearPeripheralAndLoader() {
    console.log("this peripheralName", this.state.connectedPeripheralName);
    this.setState({ connectedPeripheralName: "" }, () => {
      console.log("this peripheralName", this.state.connectedPeripheralName);
      this.startActualScan();
    });
  }

  onBackButtonPressAndroid = () => {
    return true;
  };

  callConnectDisconnect(isDisconnect, peripheral) {
    const { connectedPeripheral } = this.state;
    if (peripheral) {
      this.setState({ showLoader: true }, () => {
        if (isDisconnect) {
          console.log("connectedPeripheral123", connectedPeripheral);
          if (connectedPeripheral) {
            this.disconnectBLE(connectedPeripheral);
            console.log("connectedPeripheral", connectedPeripheral);
          }
          this.connectBLE(peripheral);
        } else {
          this.disconnectBLE(peripheral);
        }
      });
    } else showAlertOnlyOK(AMPLI_CONNCETION_DLGS.deviceScan, "", null);
  }

  getDataFromList(tableData) {
    const { connectedPeripheralName } = this.state;
    const listItems = tableData.map((item, index) =>
      item ? (
        item.localName ? (
          <View
            key={item + "_" + index}
            style={[styles.ACListItemMainView, styles.buttonShadow]}
          >
            <View style={styles.ACListItemLabelView}>
              {getText(item.localName, styles.AcItemLocalName)}
              {getText(item.id, styles.ACListeItemSubtitleLabel)}
            </View>
            <View style={styles.ACListItemButtonView}>
              <TouchableOpacity
                style={[
                  {
                    backgroundColor:
                      connectedPeripheralName === item.localName
                        ? Colors.Red
                        : Colors.Green
                  },
                  styles.ACListItemGreenRedButton,
                  styles.buttonShadow
                ]}
                onPress={() =>
                  this.callConnectDisconnect(
                    connectedPeripheralName === item.localName ? false : true,
                    item
                  )
                }
              >
                {getText(
                  connectedPeripheralName === item.localName
                    ? "Disconnect"
                    : "Connect",
                  styles.ACListItemGreenRedButtonText
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : null
      ) : null
    );

    return <View>{listItems}</View>;
  }

  onChangeCheckBox() {
    this.setState({ isFilteredList: !this.state.isFilteredList }, () => {
      this.startScan();
    });
  }

  render() {
    const { showLoader, peripheralNames, bluetoothState } = this.state;

    return (
      <View style={styles.container}>
        <BarHeader
          navigation={this.props.navigation}
          title={"Amplifier Connection"}
          isBackButton={false}
        />

        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              marginTop: "3%",
              height: "6%",
              width: "100%"
              // backgroundColor: Colors.Black
            }}
          >
            <View style={styles.ACBluetoothStatus}>
              {getText("Bluetooth status:", { fontSize: 16 })}
              {getText(" " + bluetoothState, [
                {
                  color: bluetoothState === "On" ? Colors.Green : Colors.Red
                },
                styles.ACbluetoothState
              ])}
            </View>

            <CheckBox
              isCheck={this.state.isFilteredList}
              onChangeCheckBox={() => this.onChangeCheckBox()}
              title="Filtered Devices"
              containerStyle={styles.ACFilterCheckboxView}
            />
          </View>

          <View style={styles.separator} />

          <TouchableOpacity
            style={{ marginTop: "3%" }}
            onPress={() => this.startScan()}
          >
            <LinearButton
              text={"Scan BLE Devices"}
              textStyle={styles.ACscanButtonText}
              buttonStyle={[
                {
                  backgroundColor:
                    this.state.scanning === true
                      ? Colors.greyBisableButton
                      : Colors.AnalogicBlue700
                },
                styles.ACButtonStyle,
                styles.buttonShadow
              ]}
            />
            {showLoader === true ? (
              <ActivityIndicator
                style={{ marginVertical: "2%" }}
                size="small"
              />
            ) : null}
          </TouchableOpacity>

          <ScrollView style={styles.ACbackgroundForDeviceList}>
            {peripheralNames && this.state.peripherals
              ? this.getDataFromList(this.state.peripherals)
              : getText("No peripherals", styles.ACBluetoothtatus)}
          </ScrollView>
        </View>
      </View>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  const { component } = state;

  return {
    peripheralState: component.get(BLE_MANAGER_ID, Map())
  };
}

export default connect(mapStateToProps, {
  updateComponentState,
  deleteComponentState,
  requestData
})(AmplifierConnection);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { BackHandler, View, Platform } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import VM_JSON from "../../components/JSON/VoltageMonitoring.json";
import { styles } from "../../styles/styles";
import BarHeader from "../../widgets/BarHeader";
import { VOLTAGE_MONITORING_ID } from "../../constants/app.constants";
import BLEWidget from "../../widgets/BLEManager/BLEWidget";
import { VOLTAGE_MONITORING_APIS } from "../../constants/api.constants";

class VoltageMonitoring extends Component {
  constructor(props) {
    super(props);
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {};

  render() {
    const BLEManagerProps = {
      id: VOLTAGE_MONITORING_ID,
      jsonFile: VM_JSON,
      navigation: this.props.navigation,
      addServerApi: VOLTAGE_MONITORING_APIS.addVoltage,
      title: "Voltage Monitoring"
    };

    return (
      <View style={styles.container}>
        <BarHeader
          navigation={this.props.navigation}
          title={BLEManagerProps.title}
          isBackButton={false}
        />

        <BLEWidget {...BLEManagerProps} />
      </View>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  const { component } = state;
  return {};
}

export default connect(mapStateToProps, {
  updateComponentState,
  requestData
})(VoltageMonitoring);

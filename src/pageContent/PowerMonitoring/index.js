import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { BackHandler, View, Platform } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import PM_JSON from "../../components/JSON/PowerMonitoring.json";
import { styles } from "../../styles/styles";
import BarHeader from "../../widgets/BarHeader";
import { POWER_MONITORING_ID } from "../../constants/app.constants";
import BLEWidget from "../../widgets/BLEManager/BLEWidget";
import { POWER_MONITORING_APIS } from "../../constants/api.constants";

class PowerMonitoring extends Component {
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
      id: POWER_MONITORING_ID,
      jsonFile: PM_JSON,
      navigation: this.props.navigation,
      addServerApi: POWER_MONITORING_APIS.addPower,
      title: "Power Monitoring"
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
})(PowerMonitoring);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { BackHandler, View, Platform } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import CM_JSON from "../../components/JSON/CurrentMonitoring.json";
import { styles } from "../../styles/styles";
import BarHeader from "../../widgets/BarHeader";
import { CURRENT_MONITORING_ID } from "../../constants/app.constants";
import BLEWidget from "../../widgets/BLEManager/BLEWidget";
import { CURRENT_MONITORING_APIS } from "../../constants/api.constants";

class CurrentMonitoring extends Component {
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
      id: CURRENT_MONITORING_ID,
      jsonFile: CM_JSON,
      navigation: this.props.navigation,
      addServerApi: CURRENT_MONITORING_APIS.addCurrent,
      title: "Current Monitoring"
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
})(CurrentMonitoring);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { BackHandler, View, Platform } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import FL_JSON from "../../components/JSON/FaultLog.json";
import { styles } from "../../styles/styles";
import BarHeader from "../../widgets/BarHeader";
import { FAULT_LOG_ID } from "../../constants/app.constants";
import BLEFaultLogWidget from "../../widgets/BLEManager/BLEFaultLogWidget";
import { FAULT_LOG_APIS } from "../../constants/api.constants";

class FaultLog extends Component {
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
      id: FAULT_LOG_ID,
      jsonFile: FL_JSON,
      navigation: this.props.navigation,
      addServerApi: FAULT_LOG_APIS.addFaultLog,
      title: "Fault Log"
    };

    return (
      <View style={styles.container}>
        <BarHeader
          navigation={this.props.navigation}
          title={BLEManagerProps.title}
          isBackButton={false}
        />

        <BLEFaultLogWidget {...BLEManagerProps} />
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
})(FaultLog);

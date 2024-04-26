import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { BackHandler, View, Platform } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import EL_JSON from "../../components/JSON/ErrorLog.json";
import { styles } from "../../styles/styles";
import BarHeader from "../../widgets/BarHeader";
import { ERROR_LOG_ID } from "../../constants/app.constants";
import BLEErrorLogWidget from "../../widgets/BLEManager/BLEErrorLogWidget";
import { ERROR_LOG_APIS } from "../../constants/api.constants";

class ErrorLog extends Component {
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
      id: ERROR_LOG_ID,
      jsonFile: EL_JSON,
      navigation: this.props.navigation,
      addServerApi: ERROR_LOG_APIS.addErrorLog,
      title: "Error Log"
    };

    return (
      <View style={styles.container}>
        <BarHeader
          navigation={this.props.navigation}
          title={BLEManagerProps.title}
          isBackButton={false}
        />

        <BLEErrorLogWidget {...BLEManagerProps} />
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
})(ErrorLog);

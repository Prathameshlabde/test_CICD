import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { BackHandler, View, Platform } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import CL_JSON from "../../components/JSON/CounterLog.json";
import { styles } from "../../styles/styles";
import BarHeader from "../../widgets/BarHeader";
import { COUNTER_LOG_ID } from "../../constants/app.constants";
import { COUNTER_LOG_APIS } from "../../constants/api.constants";
import BLEWidget from "../../widgets/BLEManager/BLEWidget";

class CounterLog extends Component {
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
      id: COUNTER_LOG_ID,
      jsonFile: CL_JSON,
      navigation: this.props.navigation,
      addServerApi: COUNTER_LOG_APIS.addCounterLog,
      title: "Counter Log"
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
})(CounterLog);

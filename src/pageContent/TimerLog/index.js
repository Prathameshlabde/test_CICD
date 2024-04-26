import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { BackHandler, View, Platform } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import TL_JSON from "../../components/JSON/TimerLog.json";
import { styles } from "../../styles/styles";
import BarHeader from "../../widgets/BarHeader";
import { TIMER_LOG_ID } from "../../constants/app.constants";
import { TIMER_LOG_APIS } from "../../constants/api.constants";
import BLEWidget from "../../widgets/BLEManager/BLEWidget";

class TimerLog extends Component {
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
      id: TIMER_LOG_ID,
      jsonFile: TL_JSON,
      navigation: this.props.navigation,
      addServerApi: TIMER_LOG_APIS.addTimerLog,
      title: "Timer Log"
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
})(TimerLog);

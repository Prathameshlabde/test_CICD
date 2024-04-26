import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { BackHandler, View, Platform } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import PEAK_COUNTER_JSON from "../../components/JSON/PeakCounter.json";
import { styles } from "../../styles/styles";
import BarHeader from "../../widgets/BarHeader";
import { PEAK_COUNTER_ID } from "../../constants/app.constants";
import { PEAK_COUNTER_APIS } from "../../constants/api.constants";
import BLETableWidget from "../../widgets/BLEManager/BLETableWidget";

class PeakCounter extends Component {
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
      id: PEAK_COUNTER_ID,
      jsonFile: PEAK_COUNTER_JSON,
      navigation: this.props.navigation,
      addServerApi: PEAK_COUNTER_APIS.addPeakCounter,
      title: "Peak Counter"
    };

    return (
      <View style={styles.container}>
        <BarHeader
          navigation={this.props.navigation}
          title={BLEManagerProps.title}
          isBackButton={false}
        />

        <BLETableWidget {...BLEManagerProps} />
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
})(PeakCounter);

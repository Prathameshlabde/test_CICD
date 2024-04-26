import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { BackHandler, View, Platform } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import AVG_COUNTER_JSON from "../../components/JSON/AvgCounter.json";
import { styles } from "../../styles/styles";
import BarHeader from "../../widgets/BarHeader";
import { AVG_COUNTER_ID } from "../../constants/app.constants";
import { AVG_COUNTER_APIS } from "../../constants/api.constants";
import BLETableWidget from "../../widgets/BLEManager/BLETableWidget";

class AvgCounter extends Component {
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
      id: AVG_COUNTER_ID,
      jsonFile: AVG_COUNTER_JSON,
      navigation: this.props.navigation,
      addServerApi: AVG_COUNTER_APIS.addAvgCounter,
      title: "Average Counter"
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
})(AvgCounter);

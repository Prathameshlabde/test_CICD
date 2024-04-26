import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { BackHandler, View, Platform } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import JOULES_COUNTER_JSON from "../../components/JSON/JoulesCounter.json";
import { styles } from "../../styles/styles";
import BarHeader from "../../widgets/BarHeader";
import { JOULES_COUNTER_ID } from "../../constants/app.constants";
import { JOULES_COUNTER_APIS } from "../../constants/api.constants";
import BLEWidget from "../../widgets/BLEManager/BLEWidget";

class JoulesCounter extends Component {
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
      id: JOULES_COUNTER_ID,
      jsonFile: JOULES_COUNTER_JSON,
      navigation: this.props.navigation,
      addServerApi: JOULES_COUNTER_APIS.addJoulesCounter,
      title: "Joules Counter"
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
})(JoulesCounter);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { BackHandler, View, Platform } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import AI_JSON from "../../components/JSON/AmplifierInformation.json";
import { styles } from "../../styles/styles";
import BarHeader from "../../widgets/BarHeader";
import { AMPLIFIER_INFORMATION_ID } from "../../constants/app.constants";
import BLEWidget from "../../widgets/BLEManager/BLEWidget";
import { AMPLIFIER_INFO_APIS } from "../../constants/api.constants";

class AmplifierInformation extends Component {
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
      id: AMPLIFIER_INFORMATION_ID,
      jsonFile: AI_JSON,
      navigation: this.props.navigation,
      addServerApi: AMPLIFIER_INFO_APIS.addAmplifier,
      title: "Amplifier Information"
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
})(AmplifierInformation);

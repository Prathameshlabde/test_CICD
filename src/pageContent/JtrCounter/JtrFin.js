import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { BackHandler, View, Platform } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import JTR_FIN_COUNTER_JSON from "../../components/JSON/JtrFinCounter.json";
import { styles } from "../../styles/styles";
import BarHeader from "../../widgets/BarHeader";
import { JTR_FIN_COUNTER_ID } from "../../constants/app.constants";
import { JTR_COUNTER_APIS } from "../../constants/api.constants";
import BLEWidget from "../../widgets/BLEManager/BLEWidget";

class JtrFin extends Component {
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
      id: JTR_FIN_COUNTER_ID,
      jsonFile: JTR_FIN_COUNTER_JSON,
      navigation: this.props.navigation,
      addServerApi: JTR_COUNTER_APIS.addFinJtrCounter,
      title: "Junction Temperature Rise FIN"
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
})(JtrFin);

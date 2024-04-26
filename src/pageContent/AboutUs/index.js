import React, { Component } from "react";
import { connect } from "react-redux";
import { Keyboard, View, BackHandler, ScrollView } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import Loader from "../../widgets/Loader";
import NetInfo from "@react-native-community/netinfo";
import BarHeader from "../../widgets/BarHeader";
import { styles } from "../../styles/styles";
import { getErrorDiv, getText } from "../../components/utils/ui.utils";
import { Linking } from "react-native";
import { ABOUT_US } from "../../constants/app.constants";

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      isConnected: false,
      errorMessage: "",
      errorDivColor: ""
    };
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
  }

  handleConnectionChange = connectionInfo => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isConnected });
    });
  };

  handleBackButtonClick = () => {};

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  clearError() {
    Keyboard.dismiss();
    this.setState({
      errorMessage: "",
      errorDivColor: ""
    });
  }

  dismissKeyboard() {
    Keyboard.dismiss();
  }

  render() {
    const { showLoader, errorMessage, errorDivColor } = this.state;
    return (
      <View style={styles.container}>
        <BarHeader
          navigation={this.props.navigation}
          title={"About Us"}
          isBackButton={false}
        />
        {errorMessage ? getErrorDiv(errorMessage, errorDivColor) : null}
        {showLoader === true ? <Loader showLoader={showLoader} /> : null}

        <ScrollView style={{ height: "100%" }}>
          <View style={styles.AboutConatiner}>
            {getText(ABOUT_US.thankText, styles.AboutText)}
            {getText(ABOUT_US.headquarter, styles.AboutText)}
            {getText(ABOUT_US.product, styles.AboutText)}

            {getText(ABOUT_US.contact, styles.AboutText)}
            {getText(ABOUT_US.WebsiteLink, styles.WebsiteLink, () => {
              Linking.openURL("https://www.analogic.com");
            })}

            {getText(ABOUT_US.regards, [
              styles.AboutBottomText,
              { marginTop: "2%" }
            ])}
            {getText(ABOUT_US.teamText, styles.AboutBottomText)}
            <View style={{ marginVertical: "1%" }} />
            <View style={styles.separator} />
            {getText(ABOUT_US.appVersionLabel + " " + ABOUT_US.appVersionTxt, [
              styles.versionText
            ])}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  const { data } = state;
  return {};
}

export default connect(mapStateToProps, {
  updateComponentState,
  requestData
})(AboutUs);

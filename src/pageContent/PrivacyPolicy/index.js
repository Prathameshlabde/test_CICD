import React, { Component } from "react";
import { View } from "react-native";
import BarHeader from ".././../widgets/BarHeader.js";
import WebView from "react-native-webview";
import NetInfo from "@react-native-community/netinfo";
import { styles } from "../../styles/styles.js";
import { getErrorDivSpecial } from "../../components/utils/ui.utils";
import { INTERNAL_SERVER_ERROR } from "../../constants/dialog.constants";
import { Colors } from "../../components/utils/colors.utils";

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false
    };
    NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
  }

  handleConnectionChange = connectionInfo => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ isConnected });
    });
  };

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  render() {
    const { isConnected } = this.state;
    return (
      <View style={styles.baseTopView2}>
        <BarHeader
          navigation={this.props.navigation}
          title={"Privacy Policy"}
          isBackButton={false}
        />
        {isConnected ? (
          <WebView source={{ uri: "https://www.analogic.com/privacy-policy/" }} />
        ) : (
            getErrorDivSpecial(
              INTERNAL_SERVER_ERROR.internetConnectionMessage,
              Colors.Red
            )
          )}
      </View>
    );
  }
}
export default PrivacyPolicy;

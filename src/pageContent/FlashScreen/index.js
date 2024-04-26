import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import { View, Image, AppState } from "react-native";
import { updateComponentState } from "../../actions/component.actions";
import { requestData } from "../../actions/data.actions";
import { resetNavigationAndPush } from "../../Routes/navigationComponent";
import ProgressBar from "../../widgets/ProgressBar";
import { Colors } from "../../components/utils/colors.utils";

class FlashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      username: "",
      password: "",
      appState: AppState.currentState
    };
  }

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    this.callLogin();
  }

  callLogin() {
    this.setState(
      {
        showLoader: true
      },
      () => {
        setTimeout(() => {
          this.setState({ showLoader: false }, () => {
            this.goToAmplifierInformation();
          });
        }, 2000);
      }
    );
  }

  goToAmplifierInformation() {
    this.setState(
      {
        showLoader: false
      },
      () => {
        this.props.navigation.dispatch(
          resetNavigationAndPush("AmplifierInformation")
        );
      }
    );
  }

  _handleAppStateChange = nextAppState => {
    this.setState({ appState: nextAppState });

    if (nextAppState === "background") {
      // Do something here on app background.
      // console.log("App is in Background Mode.");
    }

    if (nextAppState === "active") {
      // Do something here on app active foreground mode.
      // console.log("App is in Active Foreground Mode.");
      // console.log("App is in Active Foreground Mode.");
      this.callLogin();
    }

    if (nextAppState === "inactive") {
      // Do something here on app inactive mode.
      // console.log("App is in inactive Mode.");
    }
  };

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  render() {
    const { showLoader } = this.state;
    return (
      <View
        style={{ height: "100%", width: "100%", backgroundColor: Colors.White }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            height: "85%",
            width: "100%"
          }}
        >
          <Image
            source={require("../../components/assets/analogic_logo.png")}
          />
        </View>

        {showLoader === true ? (
          // <View style={{ marginTop: "3%" }}>
          <ProgressBar showLoader={showLoader} />
        ) : // </View>
        null}
      </View>
    );
  }
}

export function mapStateToProps(state, ownProps) {
  const { component } = state;
  return {};
}

export default connect(
  mapStateToProps,
  {
    updateComponentState,
    requestData
  }
)(FlashScreen);

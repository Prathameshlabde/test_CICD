import React, { Component } from "react";
import { View } from "react-native";
import { Colors } from "../components/utils/colors.utils";
import { styles } from "../styles/styles";
import ActivityIndicator from "react-native-activity-indicator";

class Loader extends Component {
  render() {
    const { showLoader } = this.props;
    return (
      <View style={styles.activityOverlay}>
        <ActivityIndicator
          animating={showLoader}
          size={45}
          thickness={4}
          color={Colors.AnalogicBlue900}
        />
      </View>
    );
  }
}

export default Loader;

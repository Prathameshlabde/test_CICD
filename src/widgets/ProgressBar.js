import React, { Component } from "react";
import * as Progress from "react-native-progress";
import { Colors } from "../components/utils/colors.utils";
import { styles } from "../styles/styles";
import { View } from "react-native";

class ProgressBar extends Component {
  render() {
    const { showLoader } = this.props;
    console.log("showLoader in progress bar = ", showLoader);

    return (
      <View style={styles.progressOverlay}>
        {/* <Progress.Bar progress={0.3} width={200} /> */}
        <Progress.Bar
          indeterminate={showLoader}
          progress={0.5}
          width={200}
          color={Colors.progressColor}
        />
      </View>
    );
  }
}

export default ProgressBar;

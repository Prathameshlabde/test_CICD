import React, { Component } from "react";
import { View } from "react-native";
import { Colors } from "../components/utils/colors.utils";
import { getIcon, getText } from "../components/utils/ui.utils";

class WorkInProgress extends Component {
  render() {
    return (
      <View
        style={{
          height: "90%",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {getIcon("work", "MaterialIcons", Colors.AnalogicThemeBlackGrey, 28)}
        {getText("Work in Progress", {})}
      </View>
    );
  }
}

export default WorkInProgress;

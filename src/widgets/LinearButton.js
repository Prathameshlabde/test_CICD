import React, { Component } from "react";
import { Colors } from "../components/utils/colors.utils";
import { styles } from "../styles/styles";
import LinearGradient from "react-native-linear-gradient";
import * as Animatable from "react-native-animatable";
import { Text } from "react-native";

class LinearButton extends Component {
  render() {
    const { text, textStyle, buttonStyle } = this.props;
    let gradientColors = [Colors.AnalogicBlue700, Colors.AnalogicBlue500];
    if (this.props.color && this.props.color === "red") {
      gradientColors = [Colors.AnalogicRed700, Colors.AnalogicRed600];
    }

    return (
      <Animatable.View
        animation="pulse"
        easing="ease"
        iterationCount={1}
        style={styles.mainViewOverlay}
      >
        <LinearGradient
          start={{ x: 0.25, y: 0.0 }}
          end={{ x: 1.0, y: 0.5 }}
          locations={[0, 0.9]}
          colors={gradientColors}
          style={buttonStyle}
        >
          <Text allowFontScaling={false} style={textStyle}>
            {text}
          </Text>
        </LinearGradient>
      </Animatable.View>
    );
  }
}

export default LinearButton;

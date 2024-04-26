import React, { Component } from "react";
import { Colors } from "../components/utils/colors.utils";
// import SwitchToggle from "react-native-switch-toggle";

class SwitchWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textRight: this.props.textRight,
      textLeft: this.props.textLeft
    };
  }

  getRightText() {
    return this.props.switchOn ? "" : this.props.textRight;
  }

  getLeftText() {
    return this.props.switchOn ? this.props.textLeft : "";
  }

  getRightTextStyle() {
    return this.props.switchOn
      ? { fontSize: 12, color: this.props.switchOffColor, fontWeight: "700" }
      : { fontSize: 12, color: this.props.switchOnColor, fontWeight: "700" };
  }

  getLeftTextStyle() {
    return this.props.switchOn
      ? { fontSize: 12, color: this.props.switchOffColor, fontWeight: "700" }
      : { fontSize: 12, color: this.props.switchOnColor, fontWeight: "700" };
  }

  onPressSwitch = () => {
    this.setState({ switchOn: !this.props.switchOn });
  };

  render() {
    const { onPressSwitch } = this.props;
    return (
      <View />
      // <SwitchToggle
      //   backTextRight={this.getRightText()}
      //   backTextLeft={this.getLeftText()}
      //   type={1}
      //   buttonStyle={{
      //     alignItems: "center",
      //     justifyContent: "center",
      //     position: "absolute"
      //   }}
      //   rightContainerStyle={{
      //     flex: 1,
      //     alignItems: "center",
      //     justifyContent: "center"
      //   }}
      //   leftContainerStyle={{
      //     // flex: 1,
      //     alignItems: "center",
      //     justifyContent: "center",
      //     paddingLeft: 15
      //   }}
      //   buttonTextStyle={{ fontSize: 12 }}
      //   textRightStyle={this.getRightTextStyle()}
      //   textLeftStyle={this.getLeftTextStyle()}
      //   containerStyle={{
      //     // marginTop: 16,
      //     width: this.props.width,
      //     height: this.props.height,
      //     borderRadius: 30,
      //     padding: 5
      //   }}
      //   backgroundColorOn={this.props.switchOnColor}
      //   backgroundColorOff={Colors.AnalogicThemeLightGrey}
      //   circleStyle={{
      //     width: 20,
      //     height: 20,
      //     borderRadius: 15,
      //     backgroundColor: "blue"
      //   }}
      //   switchOn={this.props.switchOn}
      //   onPress={onPressSwitch}
      //   circleColorOff={this.props.switchOnColor}
      //   circleColorOn={this.props.switchOffColor}
      //   duration={500}
      // />
    );
  }
}

export default SwitchWidget;

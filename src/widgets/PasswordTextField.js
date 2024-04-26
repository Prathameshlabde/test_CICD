import React, { Component } from "react";
import { View } from "react-native";
import { styles } from "../styles/styles";
// import { TextField } from "react-native-material-textfield";
import Icon from "react-native-vector-icons/MaterialIcons";

class PasswordTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icEye: "visibility-off",
      securePassword: true
    };
  }

  changePwdType = () => {
    let newState;
    if (this.state.securePassword) {
      newState = {
        icEye: "visibility",
        securePassword: false
      };
    } else {
      newState = {
        icEye: "visibility-off",
        securePassword: true
      };
    }

    // set new state value
    this.setState(newState);
  };

  render() {
    const { label, value, Errorpassword, onChangeText } = this.props;
    return (
      <View>
        {/* <TextField
          secureTextEntry={this.state.securePassword}
          error={Errorpassword}
          allowFontScaling={false}
          Field
          fontSize={18}
          label={label}
          value={value}
          onChangeText={onChangeText}
        /> */}
        <Icon
          style={styles.eyeIcon}
          name={this.state.icEye}
          size={25}
          onPress={this.changePwdType}
        />
      </View>
    );
  }
}

export default PasswordTextField;

import React, { Component } from "react";
import { Colors } from "../components/utils/colors.utils";
import { styles } from "../styles/styles";
import Checkbox from "react-native-modest-checkbox";
import { getIcon, getText } from "../components/utils/ui.utils";
import { View } from "react-native";

class CheckBox extends Component {
  render() {
    const { isCheck, onChangeCheckBox, title, containerStyle } = this.props;
    const checkedIcon = getIcon(
      "check-square-o",
      "font-awesome",
      Colors.AnalogicHeaderColor,
      27
    );
    const unCheckedIcon = getIcon(
      "square-o",
      "font-awesome",
      Colors.AnalogicThemeBlackGrey,
      27
    );

    return (
      <View style={containerStyle ? containerStyle : styles.containerTopIcons}>
        <Checkbox
          containerStyle={{ width: 28 }}
          checkedComponent={checkedIcon}
          uncheckedComponent={unCheckedIcon}
          checked={isCheck}
          label={""}
          onChange={onChangeCheckBox}
        />
        {getText(title, { left: 0, marginTop: 2 })}
      </View>
    );
  }
}

export default CheckBox;

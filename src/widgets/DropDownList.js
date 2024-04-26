import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text
} from "react-native";
// import RNPickerSelect from "react-native-picker-select-enhanced";
import { Colors } from "../components/utils/colors.utils";
import { styles } from "../styles/styles";
import { colors } from "react-native-elements";

class DropDownList extends Component {
  constructor(props) {
    super(props);
    this.inputRefs = {};
  }

  onChangeDropDown(obj) {
    this.props.onValueChange(this.props.id, obj);
  }

  getItems(options) {
    const dropdownItems = options.map((item, index) => (
      <View key={item.label} style={{ flex: 1, paddingHorizontal: 5 }}>
        <TouchableOpacity
          style={{
            height: 50,
            padding: 5,
            paddingLeft: 10,
            color: colors.grey1,
            flex: 1,
            justifyContent: "center",
            fontSize: 14,
            borderBottomColor: colors.grey5,
            borderBottomWidth: 1
          }}
          onPress={() => this.onChangeDropDown(item)}
          activeOpacity={1}
        >
          <Text allowFontScaling={false} style={styles.dropdownList}>
            {item.label}
          </Text>
        </TouchableOpacity>
      </View>
    ));
    return <View>{dropdownItems}</View>;
  }

  render() {
    const { placeHolder, value, options, onValueChange } = this.props;
    return Platform.OS === "ios" ? (
      <View>
        {/* <RNPickerSelect
          placeholder={placeHolder}
          items={options}
          onValueChange={onValueChange}
          style={{ ...pickerSelectStyles }}
          value={value}
          ref={el => {
            this.inputRefs.picker = el;
          }}
          hideIcon={Platform.OS === "ios" ? false : true}
        /> */}
      </View>
    ) : (
      this.getItems(options)
    );
  }
}

export default DropDownList;

const pickerSelectStyles = StyleSheet.create({
  viewContainer: {
    width: "100%",
    backgroundColor: Colors.Green
  },
  inputAndroid: {
    width: "100%"
  },
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingBottom: 12,
    borderRadius: 4,
    backgroundColor: "white",
    color: "black"
  },
  icon: { marginHorizontal: 5 }
});

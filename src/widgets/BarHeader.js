import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Keyboard, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { Colors } from "../components/utils/colors.utils";
import { styles } from "../styles/styles";
import DrawerActions from "react-navigation-drawer/dist/routers/DrawerActions";
import { getText } from "../components/utils/ui.utils";

class BarHeader extends Component {
  static propTypes = {
    id: PropTypes.string
  };

  getMenuIcon(name, type) {
    return <Icon name={name} type={type} color={Colors.White} size={29} />;
  }

  getLeftButton(isBackButton, navigation) {
    if (isBackButton === true) {
      return (
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            navigation.goBack();
          }}
          style={styles.headerMenuIcon}
        >
          {this.getMenuIcon("arrow-back", "MaterialIcons")}
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={styles.headerMenuIconView}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              navigation.dispatch(DrawerActions.toggleDrawer());
            }}
            style={styles.headerMenuIcon}
          >
            {this.getMenuIcon("align-justify", "feather")}
          </TouchableOpacity>
        </View>
      );
    }
  }

  getTitle(title) {
    return (
      <View style={styles.statusBarView}>
        {getText(title, styles.statusBarText)}
      </View>
    );
  }

  render() {
    const { navigation, title, isBackButton } = this.props;
    return (
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        outerContainerStyles={styles.headerOuterContainer}
        containerStyle={{
          justifyContent: "space-between",
          alignItems: "center"
        }}
        backgroundColor={Colors.AnalogicHeaderColor}
        leftComponent={this.getLeftButton(isBackButton, navigation)}
        centerComponent={this.getTitle(title)}
        centerContainerStyle={{
          justifyContent: "center",
          alignItems: "center"
        }}
        leftContainerStyle={{
          flex: 0
        }}
        rightContainerStyle={{
          flex: 0
        }}
      />
    );
  }
}

export default BarHeader;

import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Map } from "immutable";
import menuStyles from "./SideMenu.style";
import { NavigationActions } from "react-navigation";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  BackHandler
} from "react-native";
import main_menu from "./MainMenu.json";
import {
  updateComponentState,
  deleteComponentState
} from "../actions/component.actions";
import { requestData } from "../actions/data.actions";
import { getText, getIcon } from "../components/utils/ui.utils";
import { Colors } from "../components/utils/colors.utils";
import {
  START_SCREEN_MENU,
  UPDATED_MENU,
  ANALOGIC_MENU_ID
} from "../constants/app.constants";

import NetInfo from "@react-native-community/netinfo";
import { syncToServer } from "../components/utils/LocalDatabase/syncToServer.utils.js";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMenu: START_SCREEN_MENU,
      isConnected: false
    };
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );

    NetInfo.addEventListener("connectionChange", this.handleConnectionChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menuState && this.props.menuState !== nextProps.menuState) {
      const selectedMenu = nextProps.menuState.get(UPDATED_MENU, "");
      console.log("next selectedMenu = ", selectedMenu);
      if (selectedMenu && selectedMenu !== "") {
        this.setState({ selectedMenu }, () => {
          const { deleteComponentState } = this.props;
          deleteComponentState(ANALOGIC_MENU_ID);
        });
      }
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );

    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  handleConnectionChange = connectionInfo => {
    const { isConnected } = this.state;
    const { requestData } = this.props;
    NetInfo.isConnected.fetch().then(currentNetStatus => {
      this.setState(
        {
          isConnected: currentNetStatus
        },
        () => {
          if (!isConnected && currentNetStatus) {
            syncToServer(requestData);
          }
        }
      );
    });
  };

  navigateToScreen(route, selectedMenu) {
    console.log("this.state.selectedMenu " + this.state.selectedMenu);
    console.log("selectedMenu = " + selectedMenu);

    if (this.state.selectedMenu === selectedMenu) {
      console.log("toggling drawer action");
      this.props.navigation.toggleDrawer();
    } else {
      this.setState({ selectedMenu }, () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
      });
    }
  }

  getMenuSingleItem(item) {
    const MenuName = item.name;
    let menuStyle = menuStyles.menuItem;
    let textStyle = menuStyles.menuNameText;
    let menuColor = Colors.AnalogicThemeColor;
    if (this.state.selectedMenu === MenuName) {
      menuStyle = menuStyles.selectedMenuItem;
      textStyle = menuStyles.selectedMenuNameText;
      menuColor = Colors.White;
    }
    const onPressFunc = () => this.navigateToScreen(item.routerName, MenuName);
    return (
      <TouchableOpacity key={MenuName} style={menuStyle} onPress={onPressFunc}>
        <View style={menuStyles.menuIcon}>
          {getIcon(item.iconName, item.iconFamily, menuColor, 20)}
        </View>
        <View style={menuStyles.menuName}>{getText(MenuName, textStyle)}</View>
      </TouchableOpacity>
    );
  }

  getMenuItems(sectionStyle) {
    const sectionWisemenu = main_menu.menuList.map(item =>
      this.getMenuSingleItem(item)
    );
    // return <ScrollView style={sectionStyle}>{sectionWisemenu}</ScrollView>;
    return <ScrollView style={sectionStyle}>{sectionWisemenu}</ScrollView>;
  }

  render() {
    return (
      <View style={menuStyles.container}>
        <View style={menuStyles.header}>
          <Image
            source={require("../components/assets/analogic_menu1.jpg")}
            style={{ flex: 1, width: undefined, height: undefined }}
          />
        </View>
        <View style={menuStyles.bottom}>
          {this.getMenuItems(menuStyles.section1)}
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export function mapStateToProps(state, ownProps) {
  const { component } = state;
  return {
    menuState: component.get(ANALOGIC_MENU_ID, Map())
  };
}

export default connect(
  mapStateToProps,
  {
    updateComponentState,
    deleteComponentState,
    requestData
  }
)(SideMenu);

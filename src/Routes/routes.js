import React from "react";
import {
  createDrawerNavigator,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import SideMenu from "../SideMenu/SideMenu";
import FlashScreen from "../pageContent/FlashScreen";
import AmplifierConnection from "../pageContent/AmplifierConnection";
import AmplifierInformation from "../pageContent/AmplifierInformation";
import CurrentMonitoring from "../pageContent/CurrentMonitoring";
import PowerMonitoring from "../pageContent/PowerMonitoring";
import VoltageMonitoring from "../pageContent/VoltageMonitoring";
import FaultLog from "../pageContent/FaultLog";
import ErrorLog from "../pageContent/ErrorLog";
import CounterLog from "../pageContent/CounterLog";
import TimerLog from "../pageContent/TimerLog";
import PeakCounter from "../pageContent/PeakCounter";
import AvgCounter from "../pageContent/AvgCounter";
import JtrFin from "../pageContent/JtrCounter/JtrFin";
import JtrDrv from "../pageContent/JtrCounter/JtrDrv";
import JoulesCounter from "../pageContent/JoulesCounter";
import PrivacyPolicy from "../pageContent/PrivacyPolicy";
import AboutUs from "../pageContent/AboutUs";
import { Colors } from "../components/utils/colors.utils";
import { START_SCREEN } from "../constants/app.constants";

export const Tabs = createBottomTabNavigator(
  {
    Final: { screen: JtrFin },
    Driver: { screen: JtrDrv }
  },
  {
    order: ["Final", "Driver"],
    tabBarOptions: {
      animationEnabled: true,
      swipeEnabled: true,
      showIcon: false,
      activeBackgroundColor: Colors.AnalogicThemeBlackGrey,
      inactiveBackgroundColor: Colors.White,
      activeTintColor: Colors.White,
      inactiveTintColor: Colors.AnalogicThemeBlackGrey,
      tabStyle: {
        marginTop: 0,
        textAlign: "center",
        justifyContent: "center",
        textAlignVertical: "center"
      },
      labelStyle: {
        fontSize: 17
      }
    }
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    AmplifierConnection: { screen: AmplifierConnection },
    AmplifierInformation: { screen: AmplifierInformation },
    CurrentMonitoring: { screen: CurrentMonitoring },
    PowerMonitoring: { screen: PowerMonitoring },
    VoltageMonitoring: { screen: VoltageMonitoring },
    FaultLog: { screen: FaultLog },
    ErrorLog: { screen: ErrorLog },
    CounterLog: { screen: CounterLog },
    TimerLog: { screen: TimerLog },
    PeakCounter: { screen: PeakCounter },
    AvgCounter: { screen: AvgCounter },
    // JtrCounter: {
    //   screen: Tabs
    // },
    JtrFin: { screen: JtrFin },
    JtrDrv: { screen: JtrDrv },
    JoulesCounter: { screen: JoulesCounter },
    PrivacyPolicy: { screen: PrivacyPolicy },
    AboutUs: { screen: AboutUs }
  },
  {
    initialRouteName: START_SCREEN,
    contentComponent: SideMenu,
    drawerWidth: 300,
    hideStatusBar: true
  }
);

export default Stack = createStackNavigator(
  {
    FlashScreen: { screen: FlashScreen },
    AmplifierInformation: {
      screen: DrawerNavigator
    }
  },
  {
    initialRouteName: "FlashScreen",
    mode: "card",
    headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: Colors.AnalogicThemeColor
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  }
);

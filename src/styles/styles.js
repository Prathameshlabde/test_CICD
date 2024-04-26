import { Colors } from "../components/utils/colors.utils";
import { styleConstants, fontFamily } from "./styleConstants";
import { MediaQueryStyleSheet } from "react-native-responsive";

export const styles = MediaQueryStyleSheet.create(
  {
    dropdownList: {
      color: Colors.Black
    },
    baseTopView2: {
      backgroundColor: Colors.White,
      height: "100%"
    },
    wdth50flexCol: {
      width: "50%",
      flexDirection: "column"
    },

    wdth50flexColMar3: {
      width: "50%",
      flexDirection: "column",
      marginBottom: "3%"
    },

    flexColMar3: {
      flexDirection: "column",
      marginBottom: "3%"
    },

    hgt80flexCol: {
      height: "80%",
      flexDirection: "column"
    },

    w90mar1flexRow: {
      width: "100%",
      marginBottom: "1%",
      flexDirection: "row"
    },

    w90marT1flexRow: {
      width: "90%",
      marginTop: "2%",
      flexDirection: "row"
    },

    w50flexStart: {
      width: "50%",
      alignItems: "flex-start"
    },
    w50flexEnd: {
      width: "50%",
      alignItems: "flex-end"
    },

    padHor5marBot3: {
      paddingHorizontal: "5%",
      marginBottom: "3%"
    },
    marBot1: {
      marginBottom: "1%"
    },
    marBot3: {
      marginBottom: "3%"
    },
    width50padHor2: {
      width: "50%",
      paddingHorizontal: "2%"
    },
    padVer5: {
      paddingVertical: "5%"
    },

    redError: {
      color: Colors.DarkRed,
      fontSize: 12
    },
    //-----------StatusBar Start-------------------
    headerOuterContainer: {
      height: 78
    },
    headerMenuIconView: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    headerMenuIcon: {},

    statusBarView: {
      justifyContent: "center",
      alignItems: "baseline"
    },
    statusBarText: {
      color: Colors.White,
      fontWeight: "bold",
      fontSize: 17
    },
    //-----------StatusBar End--------------------
    //-------activity indicator start-------------------
    activityOverlay: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.OverLay,
      zIndex: 10
    },
    progressOverlay: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 10,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10
    },

    //------activity indicator end-------------------

    //------------flashscreen start--------------------
    flashScreenImage: { width: "100%", height: "100%" },
    //------------flashscreen end--------------------

    separator: {
      width: "80%",
      height: 1,
      backgroundColor: Colors.AnalogicThemeLightGrey,
      marginHorizontal: "10%",
      marginVertical: "2%"
    },
    AnalogicThemeSeparator: {
      width: "100%",
      height: 1,
      backgroundColor: Colors.AnalogicHeaderColor
    },

    container: {
      backgroundColor: Colors.White,
      height: "100%"
    },
    containerLeft: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "flex-start"
    },
    containerRight: {
      width: "50%",
      flexDirection: "row",
      justifyContent: "flex-end"
    },
    containerTopIcons: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "flex-end"
    },

    buttonShadow: {
      shadowColor: Colors.Shadow,
      shadowOffset: { height: 1, width: 1 },
      shadowOpacity: 1,
      shadowRadius: 1
    },
    //=================amplifier connection start

    ACListItemGreenRedButton: {
      height: 30,
      alignContent: "center",
      justifyContent: "center",
      width: "70%",
      borderRadius: 20
    },
    ACListItemGreenRedButtonText: { color: Colors.White, textAlign: "center" },
    ACcontainerStatus: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "1%"
    },
    ACscanButtonText: { color: "white", textAlign: "center", fontSize: 18 },
    ACButtonStyle: {
      marginHorizontal: "10%",
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      borderRadius: 5
    },
    ACbackgroundForDeviceList: {
      flex: 1,
      marginHorizontal: "3%",
      marginTop: "5%",
      marginBottom: "23%",
      backgroundColor: "#f2f2f2",
      paddingTop: "2%"
    },

    ACnOperipherals: { flex: 1, margin: "6%" },

    ACBluetoothStatus: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "50%"
    },
    ACFilterCheckboxView: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      width: "50%"
    },
    ACbluetoothState: { fontWeight: "bold", fontSize: 16 },
    ACBluetoothtatus: { textAlign: "center", fontSize: 16 },

    ACListItemMainView: {
      alignContent: "center",
      justifyContent: "center",
      marginBottom: "2%",
      marginHorizontal: "2%",
      borderRadius: 3,
      padding: "1%",
      flexDirection: "row",
      width: "96%",
      height: 70,
      backgroundColor: Colors.White
    },
    AcItemLocalName: {
      paddingTop: "1%",
      fontSize: 15,
      textAlign: "center",
      fontWeight: "bold",
      color: Colors.Black,
      flexWrap: "wrap"
    },
    ACListItemLabelView: {
      width: "58%",
      height: 50,
      alignContent: "center",
      justifyContent: "center",
      paddingTop: "1%",
      paddingLeft: "1%"
      // backgroundColor: Colors.Red
    },
    ACListeItemSubtitleLabel: {
      textAlign: "center",
      color: "grey",
      flexWrap: "wrap",
      fontSize: 12
    },
    ACListItemButtonView: {
      width: "42%",
      alignItems: "flex-end",
      justifyContent: "center",
      height: 50,
      paddingRight: "1%",
      paddingTop: "0.5%"
    },

    //=================amplifier connection End
    //=================Common Fields UI end
    CFieldTopView: { width: "100%", flexDirection: "column" },
    CFieldView: {
      width: "100%",
      flexDirection: "row",
      marginVertical: "3%"
    },
    CFieldLabelView: { width: "50%", height: 25 },
    CFieldLabelView2: { width: "40%", height: 25 },
    CFieldLabel: {
      textAlign: "right",
      color: Colors.TextDarkGrey,
      fontWeight: "bold"
    },
    CFieldValueView: { width: "45%", paddingLeft: "5%" },
    CFieldValueView2: { width: "55%", paddingLeft: "5%" },

    CFieldValue: {
      color: Colors.AnalogicThemeColor,
      fontWeight: "500",
      height: 20
    },

    //=================Common Fields UI end
    //=================FaultLog Start
    FLTextFieldView: {
      paddingHorizontal: "2%",
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    FLBottomContainer: {
      padding: "5%",
      height: "90%",
      width: "100%"
    },
    FLScrollView: {
      width: "100%"
    },
    FLNumberText: {
      color: Colors.Black,
      fontWeight: "bold"
    },
    FLField: {
      // paddingVertical: 5,
      height: 100,
      backgroundColor: Colors.White,
      justifyContent: "center",
      alignItems: "flex-start",
      marginVertical: "1%"
    },
    FLFieldLabel: {
      marginVertical: "1%",
      color: Colors.TextDarkGrey,
      fontWeight: "bold"
    },
    FLFieldValue: {
      marginVertical: "1%",
      color: Colors.AnalogicThemeColor,
      // fontSize: 12,
      flexWrap: "wrap"
    },
    FLGetResultBtn: {
      width: 140,
      height: 55,
      marginTop: 20,
      paddingLeft: 10
    },

    //=================FaultLog End
    //================= About Us
    versionText: {
      flexWrap: "wrap",
      textAlign: "center",
      fontSize: 16,
      color: Colors.AnalogicThemeColor,
      marginVertical: "3%"
    },

    AboutText: {
      marginVertical: "3%",
      marginHorizontal: "2%",
      flexWrap: "wrap",
      fontSize: 16,
      textAlign: "center"
    },
    // AboutBottomText: { marginHorizontal: "2%", marginTop: "2%", fontSize: 16 },
    WebsiteLink: { color: Colors.AnalogicThemeColor, fontSize: 20 },
    AboutConatiner: {
      marginTop: "6%",
      justifyContent: "center",
      alignItems: "center"
    },
    AboutBottomText: { marginHorizontal: "2%", fontSize: 16 }

    //================= About Us
  },

  {
    //Media Queries styles: For the screen which is more then 768 pixel. tab ipad
    "@media (min-device-width: 768 )": {
      FLScrollView: {
        // backgroundColor: Colors.Green,
        // height: "100%",
        // flex: 1,
        // flexGrow: 1
        // height: "auto"
        // padding: "5%"
      },
      ACbackgroundForDeviceList: {
        flex: 1,
        marginHorizontal: "3%",
        marginTop: "5%",
        marginBottom: "13%",
        backgroundColor: "#f2f2f2"
      }
    },
    //For mini device height of 811 or less
    "@media (max-device-height: 812)": {
      //and (min-device-width: 768 )
      // FLGetResultBtn: {
      //   paddingLeft: 5
      // },
      changePassBtnSection: {
        marginTop: "3%",
        marginBottom: "-8%"
      },

      updateButtonText: {
        fontSize: 15
      }
    }
  }
);

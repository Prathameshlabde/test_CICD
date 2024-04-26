import React from "react";
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PixelRatio
} from "react-native";

import { Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { Colors } from "./colors.utils";
import DropDownList from "../../widgets/DropDownList";
import LinearButton from "../../widgets/LinearButton";
import { Divider } from "react-native-elements";
import { styles } from "../../styles/styles";
import {
  GetValueWithRegex,
  showAlertOnlyOK,
  isEmpty,
  convertHexToTime
} from "./common.utils";

import { TextField } from "react-native-material-textfield";
import {
  LOG_TEXTFIELD_DIALOGS,
  BLE_CONNECTION,
  LOCAL_STORAGE
} from "../../constants/dialog.constants";
import { showToast } from "../../widgets/snackbar.utils";
import {
  COUNTER_LOG_ID,
  TIMER_LOG_ID,
  JTR_DRV_COUNTER_ID,
  JTR_FIN_COUNTER_ID,
  AMPLIFIER_INFORMATION_ID,
  POWER_MONITORING_ID,
  CURRENT_MONITORING_ID,
  JOULES_COUNTER_ID,
  VOLTAGE_MONITORING_ID
} from "../../constants/app.constants";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function getLinearButton(text) {
  return <LinearButton text={text} textStyle={styles.ACscanButtonText} />;
}

export function getIcon(name, type, color, size) {
  return <Icon name={name} type={type} color={color} size={size} />;
}

export function getIconWithText(name, type, color, size, textStyle, textvalue) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Icon name={name} type={type} color={color} size={size} />
      <Text allowFontScaling={false} style={textStyle}>
        {textvalue}
      </Text>
    </View>
  );
}
//android aditya added OnPressFunc
export function getText(
  textvalue,
  style,
  OnPressFunc = "",
  selectable = false
) {
  return (
    <Text
      allowFontScaling={false}
      style={style}
      onPress={OnPressFunc != "" ? OnPressFunc : null}
      selectable={selectable}
    >
      {textvalue}
    </Text>
  );
}

export function getTextWithCopy(textvalue, style) {
  return (
    <Text allowFontScaling={false} style={style} selectable={true}>
      {textvalue}
    </Text>
  );
}

export function getErrorDiv(
  errorMessage,
  errorDivColor,
  animation = "bounceIn"
) {
  const errorStyle = {
    backgroundColor: errorDivColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  };

  return (
    <Animatable.View
      animation={animation}
      easing="ease"
      iterationCount={1}
      style={errorStyle}
    >
      {getText(errorMessage, { color: Colors.White })}
    </Animatable.View>
  );
}

export function getErrorDivSpecial(
  errorMessage,
  errorDivColor,
  animation = "bounceIn"
) {
  const errorStyle2 = {
    backgroundColor: errorDivColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    paddingLeft: "5%",
    paddingRight: "5%"
  };
  return (
    <Animatable.View
      animation={animation}
      easing="ease"
      iterationCount={1}
      style={errorStyle2}
    >
      {getText(errorMessage, { color: Colors.White })}
    </Animatable.View>
  );
}

export function getDropdownList(
  value,
  options,
  iosOnchange,
  androidOnchange,
  id = "",
  placeHolder = {}
) {
  return (
    <DropDownList
      id={id}
      value={value}
      options={options}
      placeHolder={placeHolder ? placeHolder : null}
      onValueChange={Platform.OS === "ios" ? iosOnchange : androidOnchange}
    />
  );
}

export function getSelectedItemAndIcon(onPress, text, placeHolderObj) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        borderBottomColor: Colors.AnalogicThemeLightGrey,
        borderBottomWidth: 1
      }}
      onPress={onPress}
    >
      <View style={{ width: "93%" }}>
        {getText(text ? text : placeHolderObj.label, {
          fontSize: 16,
          color: Colors.AnalogicThemeBlackGrey,
          marginVertical: "1%"
        })}
      </View>
      <View style={{ width: "7%", right: 0 }}>
        {getIcon(
          "arrow-drop-down",
          "MaterialIcons",
          Colors.AnalogicHeaderColor,
          24
        )}
      </View>
      <Divider style={styles.CSDivider} />
    </TouchableOpacity>
  );
}

export function getTextField(
  error = "",
  label,
  value,
  onChange,
  isSecure = false,
  disabled = false,
  keyboard = "default"
) {
  return (
    <TextField
      disabled={disabled}
      error={error}
      allowFontScaling={false}
      Field
      fontSize={18}
      label={label}
      value={value}
      onChangeText={onChange}
      secureTextEntry={isSecure}
      keyboardType={keyboard ? keyboard : "default"} //"numeric" //phone-pad
    />
  );
}

export function getFields(finalJsonArr, id) {
  // console.log("finalJsonArr in getFields = ", finalJsonArr);
  const isBasicScreen =
    id === AMPLIFIER_INFORMATION_ID ||
    id === POWER_MONITORING_ID ||
    id === CURRENT_MONITORING_ID ||
    id === VOLTAGE_MONITORING_ID;
  const isTimerScreen =
    id === TIMER_LOG_ID ||
    id === COUNTER_LOG_ID ||
    id === JTR_DRV_COUNTER_ID ||
    id === JTR_FIN_COUNTER_ID;
  if (isBasicScreen) {
    return finalJsonArr.map(item =>
      item && item.showField === true ? (
        <View style={styles.CFieldTopView} key={item.id}>
          <View style={styles.CFieldView}>
            <View style={styles.CFieldLabelView}>
              {getText(item.label, styles.CFieldLabel)}
            </View>
            <View style={styles.CFieldValueView}>
              {item.validationRegex === ""
                ? getText(item.value, styles.CFieldValue)
                : getText(GetValueWithRegex(item), styles.CFieldValue)}
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      ) : null
    );
  } else if (id === JOULES_COUNTER_ID) {
    return finalJsonArr.map(item =>
      item && item.showField === true ? (
        <View style={styles.CFieldTopView} key={item.id}>
          <View style={styles.CFieldView}>
            <View style={styles.CFieldLabelView2}>
              {getText(item.label, styles.CFieldLabel)}
            </View>

            <View style={styles.CFieldValueView2}>
              {isEmpty(item.validationRegex) && !isEmpty(item.value)
                ? getText(
                  parseInt(item.value, 16).toString(),
                  styles.CFieldValue
                )
                : !isEmpty(GetValueWithRegex(item))
                  ? getText(
                    parseInt(GetValueWithRegex(item), 16).toString(),
                    styles.CFieldValue
                  )
                  : getText("", styles.CFieldValue)}
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      ) : null
    );
  } else if (isTimerScreen) {
    return finalJsonArr.map(item =>
      item && item.showField === true ? (
        <View style={styles.CFieldTopView} key={item.id}>
          <View style={styles.CFieldView}>
            <View
              style={
                id != TIMER_LOG_ID &&
                  id !== JTR_FIN_COUNTER_ID &&
                  id !== JTR_DRV_COUNTER_ID
                  ? styles.CFieldLabelView
                  : styles.CFieldLabelView2
              }
            >
              {getText(item.label, styles.CFieldLabel)}
            </View>
            {getFieldValue(item, id)}
          </View>
          <View style={styles.separator} />
        </View>
      ) : null
    );
  }
}

export function getFieldValue(item, id) {
  if (id !== TIMER_LOG_ID) {
    return (
      <View style={styles.CFieldValueView}>
        {isEmpty(item.validationRegex)
          ? getText(item.value, styles.CFieldValue)
          : !isEmpty(GetValueWithRegex(item))
            ? getText(
              parseInt(GetValueWithRegex(item), 16).toString(),
              styles.CFieldValue
            )
            : getText("", styles.CFieldValue)}
      </View>
    );
  } else {
    return (
      <View style={styles.CFieldValueView2}>
        {isEmpty(item.validationRegex)
          ? getText(item.value, styles.CFieldValue)
          : !isEmpty(GetValueWithRegex(item))
            ? getText(
              convertHexToTime(GetValueWithRegex(item)),
              styles.CFieldValue
            )
            : getText("", styles.CFieldValue)}
      </View>
    );
  }
}

export function getNewLogData(logValuesData, logData, valuesArr) {
  const totalNumberOfEntriesToBeDisplayed = valuesArr[valuesArr.length - 1];
  let tempData = [];
  logValuesData.map((mainRow, indexMain) => {
    mainRow.map((singleItem, indexSingle) => {
      logData[indexMain][indexSingle]["value"] = singleItem;
    });
  });

  logData.map((row, index) => {
    if (
      totalNumberOfEntriesToBeDisplayed !== "" &&
      index < totalNumberOfEntriesToBeDisplayed
    ) {
      tempData.push(row);
    }
  });
  return tempData;
}

export function getLogFields(
  LogDataWithValues,
  lastEntryNumber,
  isErrorLog = false
) {
  // console.log("LogDataWithValues = ", LogDataWithValues);
  // console.log("lastEntryNumber = ", lastEntryNumber);
  // console.log("isErrorLog = ", isErrorLog);

  const dataItems = LogDataWithValues.map((singleArr, index) => {
    return (
      <View style={{ marginVertical: "1%" }} key={lastEntryNumber + index}>
        <View>
          {getText(
            isErrorLog && isErrorLog === true
              ? "Error Log Number : " + (lastEntryNumber - index)
              : "Fault Log Number : " + (lastEntryNumber - index),
            styles.FLNumberText
          )}
        </View>
        {singleArr.map((innerItem, index) => {
          return (
            <View style={styles.FLField} key={innerItem.label + index}>
              {getText(innerItem.label, styles.FLFieldLabel)}
              {getText(innerItem.value, styles.FLFieldValue)}
              <View style={styles.separator} />
            </View>
          );
        })}
      </View>
    );
  });
  return dataItems;
}

export function getTopContainerIcons(refresh, sendMail, sendToServer) {
  return (
    <View style={styles.containerTopIcons}>
      <TouchableOpacity style={{ paddingHorizontal: "2%" }} onPress={refresh}>
        {getIcon("refresh", "font-awesome", Colors.AnalogicThemeBlackGrey, 28)}
      </TouchableOpacity>
      <TouchableOpacity style={{ paddingHorizontal: "2%" }} onPress={sendMail}>
        {getIcon("mail", "entypo", Colors.AnalogicThemeBlackGrey, 28)}
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingHorizontal: "2%" }}
        onPress={sendToServer}
      >
        {getIcon("save", "entypo", Colors.AnalogicThemeBlackGrey, 28)}
      </TouchableOpacity>
    </View>
  );
}

//for counter,fault and error logs
export function getTopContainer(
  refresh,
  sendMail,
  sendToServer
  // addToLocal = null,
  // deleteFromLocal = null,
  // fetchFromLocal = null
) {
  return (
    <View style={styles.containerTopIcons}>
      <TouchableOpacity style={{ paddingHorizontal: "2%" }} onPress={refresh}>
        {getIcon("refresh", "font-awesome", Colors.AnalogicThemeBlackGrey, 28)}
      </TouchableOpacity>
      <TouchableOpacity style={{ paddingHorizontal: "2%" }} onPress={sendMail}>
        {getIcon("mail", "entypo", Colors.AnalogicThemeBlackGrey, 28)}
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingHorizontal: "2%" }}
        onPress={sendToServer}
      >
        {getIcon("save", "entypo", Colors.AnalogicThemeBlackGrey, 28)}
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={{ paddingHorizontal: "2%" }}
        onPress={addToLocal}
      >
        {getIcon("plus", "entypo", Colors.AnalogicThemeBlackGrey, 28)}
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingHorizontal: "2%" }}
        onPress={deleteFromLocal}
      >
        {getIcon("minus", "entypo", Colors.AnalogicThemeBlackGrey, 28)}
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingHorizontal: "2%" }}
        onPress={fetchFromLocal}
      >
        {getIcon("menu", "entypo", Colors.AnalogicThemeBlackGrey, 28)}
      </TouchableOpacity> */}
    </View>
  );
}

export function getResultbutton(onPressFunc) {
  return (
    <TouchableOpacity style={styles.FLGetResultBtn} onPress={onPressFunc}>
      {getLinearButton("Get Results")}
    </TouchableOpacity>
  );
}

export function getTextFieldAndResultbutton(
  errorStr,
  textStr,
  onChangeFunc,
  onPressFunc
) {
  return (
    <View style={styles.containerLeft}>
      <View style={styles.FLTextFieldView}>
        <View style={{ width: "70%", padding: "3%" }}>
          {getTextField(
            errorStr,
            LOG_TEXTFIELD_DIALOGS.textFieldTitle,
            textStr.toString(),
            onChangeFunc,
            false,
            false,
            "numeric"
          )}
        </View>
        <TouchableOpacity style={styles.FLGetResultBtn} onPress={onPressFunc}>
          <LinearButton
            text={LOG_TEXTFIELD_DIALOGS.resultBtnText}
            textStyle={styles.ACscanButtonText}
            buttonStyle={[
              {
                backgroundColor: Colors.AnalogicBlue700
              },
              styles.ACButtonStyle,
              { height: 40 },
              styles.buttonShadow
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function getFaultErrorLogFields(
  finalJsonArr,
  valuesArr,
  jsonFile,
  logValuesData,
  logData,
  LogDataWithValues,
  isErrorLog,
  id
) {
  return (
    <ScrollView style={styles.FLScrollView}>
      {getFields(finalJsonArr, id)}
      {valuesArr &&
        valuesArr.length == jsonFile.fields.length && //3 includes amplifier serial
        logValuesData.length > 0 &&
        logData
        ? getLogFields(
          LogDataWithValues,
          valuesArr[valuesArr.length - 1],
          isErrorLog
        )
        : null}
    </ScrollView>
  );
}

export function showBLEConnectionMessage(onPressFunction) {
  showAlertOnlyOK(
    BLE_CONNECTION.notConnected,
    BLE_CONNECTION.goToSettingQ,
    onPressFunction
  );
}

export function successLocalToast() {
  showToast(LOCAL_STORAGE.addSuccessMsg, false, false, 2000);
}

export function failureLocalToast() {
  showToast(LOCAL_STORAGE.addFailureMsg, true, false, 2000);
}

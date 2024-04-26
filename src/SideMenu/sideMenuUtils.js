import React from "react";
import { Text, View, ActivityIndicator, FlatList, Image } from "react-native";
import { Icon } from "react-native-elements";
import menuStyles from "./SideMenu.style";
import { Colors } from "../components/utils/colors.utils";

export function getMenuIcon(iconName, iconFamily) {
  let obj = null;
  if (iconName)
    obj = (
      <View style={menuStyles.menuIcon}>
        <Icon
          name={iconName}
          type={iconFamily}
          color={Colors.Black}
          underlayColor={Colors.DarkBlue}
          size={20}
        />
      </View>
    );

  return obj;
}

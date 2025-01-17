import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { CustomDrawerContent } from "./CustomDrawerContent";
import { constant } from "../constants/constants";
import { StackNavigation } from "./navigation/StackNav.jsx";
import { StyleSheet } from "react-native";

export function DrawerNav() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: style.primaryColor,
        overlayColor: "transparent",
        drawerActiveBackgroundColor: "#e68a00",
        drawerLabelStyle: style.labelStyle,
        drawerItemStyle: {
          borderRadius: constant.borderRadius,
        },
        headerStyle: constant.primaryColor,
        drawerType: "slide",
        headerShown: false,
      }}
      initialRouteName="PantallaCarga"
    >
      <Drawer.Screen name="Home" component={StackNavigation} />
    </Drawer.Navigator>
  );
}

const style = StyleSheet.create({
  labelStyle: {
    color: "black",
    fontSize: constant.textFontSize,
    marginHorizontal: constant.SPACING,
    fontWeight: "500",
  },
  primaryColor: {
    backgroundColor: constant.primaryColor,
  },
});

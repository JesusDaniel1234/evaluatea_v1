import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { CustomDrawerContent } from "./CustomDrawerContent";
import { ListNavigationItems, PublicListTestItems } from "../NavigationItems";
import { constant } from "../constants/constants";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: "#fdce75" },
        overlayColor: "transparent",
        drawerActiveBackgroundColor: "#e68a00",
        drawerLabelStyle: {
          color: "black",
          fontSize: constant.textFontSize,
          marginHorizontal: constant.SPACING,
          fontWeight: "500",
        },
        drawerItemStyle: {
          borderRadius: constant.borderRadius,
        },
      }}
    >
      {ListNavigationItems.map((item, index) => {
        return (
          <Drawer.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={
              {
              headerStyle: { backgroundColor: "#fdce75" },
              drawerType: "slide",
              drawerIcon: () => item.icon,
              
            }}
          />
        );
      })}
      {PublicListTestItems.map((item, index) => {
        return (
          <Drawer.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              drawerItemStyle: { display: "none" },
              headerStyle: { backgroundColor: "#fdce75" },
              drawerType: "slide",
            }}
          />
        );
      })}
    </Drawer.Navigator>
  );
}

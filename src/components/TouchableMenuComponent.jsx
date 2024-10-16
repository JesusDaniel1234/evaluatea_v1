import React, { useEffect, useState } from "react";
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigationState } from "@react-navigation/native";
import { constant } from "../constants/constants";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function TouchableMenuComponent({
  ListLabelsMenu,
  userToken,
  navigation,
}) {
  const [currentRoute, setCurrentRoute] = useState("Inicio");
  const navigationState = useNavigationState((state) => state);
  const [menuIndex, setMenuIndex] = useState(-1);
  const listaPagesPrincipal = ["Inicio", "Profile"];

  useEffect(() => {
    if (navigationState) {
      const routeName = navigationState.routes[navigationState.index]?.name;
      setCurrentRoute(routeName);
      if (listaPagesPrincipal.find((elememt) => routeName === elememt)) {
        setMenuIndex(-1);
      }
    }
  }, [navigationState]);
  console.log(currentRoute);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMenuIndex(menuIndex === index ? -1 : index);
  };

  return (
    <>
      {ListLabelsMenu.map((item, index) => {
        if (!item.needAuth === Boolean(userToken)) return;
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            style={styles.secondMenuStyles}
            onPress={() => toggleExpand(index)}
          >
            <View style={styles.secondMenuContainer}>
              <View style={styles.secondMenuDisposition}>
                {item.icon}
                <Text style={styles.secondMenuLabel}>{item.name}</Text>
              </View>

              <AntDesign
                name={menuIndex === index ? "down" : "up"}
                size={24}
                color="black"
              />
            </View>
            {menuIndex === index && (
              <View style={styles.submenuContainer}>
                {item.subMenu.map((menu, index) => {
                  return (
                    <TouchableNativeFeedback
                      key={index}
                      onPress={() =>
                        navigation.navigate(menu.navigation, {
                          test: menu.name,
                        })
                      }
                    >
                      <View style={styles.submenuContentStyle}>
                        <Text style={{ fontWeight: "500" }}>{menu.name}</Text>
                        {currentRoute === menu.name && (
                          <FontAwesome name="circle" size={10} color="black" />
                        )}
                      </View>
                    </TouchableNativeFeedback>
                  );
                })}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  secondMenuStyles: {
    marginHorizontal: constant.SPACING / 1.7,
    marginVertical: constant.SPACING / 2.5,
    borderRadius: constant.borderRadius,
  },
  secondMenuContainer: {
    flexDirection: "row",
    paddingHorizontal: constant.SPACING / 1.8,
    paddingVertical: constant.SPACING / 1.2,
    borderRadius: constant.borderRadius,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e68a00",
  },
  secondMenuDisposition: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
  },
  secondMenuLabel: {
    paddingRight: 10,
    fontSize: constant.textFontSize,
    paddingHorizontal: constant.SPACING,
    fontWeight: "500",
  },
  submenuContainer: {
    borderRadius: constant.borderRadius,
    backgroundColor: "#e68a00",
    marginTop: 4,
    marginHorizontal: 4,
    borderRadius: constant.borderRadius,
  },
  submenuContentStyle: {
    paddingHorizontal: constant.SPACING,
    paddingVertical: constant.SPACING / 1.5,
    marginVertical: 4,
    marginHorizontal: 5,
    borderRadius: constant.borderRadius,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

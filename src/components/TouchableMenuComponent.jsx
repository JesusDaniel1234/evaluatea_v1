import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigationState } from "@react-navigation/native";

export default function TouchableMenuComponent({ item }) {
  const [currentRoute, setCurrentRoute] = useState("Inicio");
  const navigationState = useNavigationState((state) => state);
  const [menuIndex, setMenuIndex] = useState(-1);
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
                onPress={() => navigation.navigate(menu.name)}
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
}

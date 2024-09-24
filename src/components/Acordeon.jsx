import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

export default function Acordeon({ texto, titulo }) {
  const [isOpenAcordeon, setIsOpenAcordeon] = useState(false);

  // Habilitar LayoutAnimation en Android
  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleAcordeon = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpenAcordeon((isOpen) => !isOpen);
  };

  return (
    <TouchableOpacity style={styles.touchableStyle} onPress={toggleAcordeon}>
      <View style={styles.container}>
        <Text style={styles.title}>{titulo}</Text>
        {isOpenAcordeon ? (
          <AntDesign name="down" size={24} color="black" />
        ) : (
          <AntDesign name="up" size={24} color="black" />
        )}
      </View>
      {isOpenAcordeon && <Text style={styles.text}>{texto}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableStyle: {
    width: "100%",
    marginBottom: 5,
    padding: 15,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: { marginTop: 10, fontSize: 15 },
  title: { fontWeight: "500", fontSize: 16 },
});

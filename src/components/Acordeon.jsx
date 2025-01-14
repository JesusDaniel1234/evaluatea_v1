import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  LayoutAnimation,
} from "react-native";


export default function Acordeon({ elemento }) {
  const [isOpenAcordeon, setIsOpenAcordeon] = useState(false);
  const { titulo, contenido } = elemento;

  return (
    <TouchableOpacity
      style={styles.touchableStyle}
      onPress={() => setIsOpenAcordeon((isOpen) => !isOpen)}
    >
      <View style={styles.container}>
        <View style={{ alignItems: "center", flexDirection: "row", gap: 10 }}>
          <AntDesign name="infocirlceo" size={24} color="black" />
          <Text style={styles.title}>{titulo}</Text>
        </View>

        <AntDesign
          name={isOpenAcordeon ? "down" : "up"}
          size={24}
          color="black"
        />
      </View>
      {isOpenAcordeon && (
        <View>
          <Text style={styles.text}>{contenido.texto}</Text>
          {contenido.lista &&
            contenido.lista.map((item, index) => (
              <Text key={index} style={styles.text}>
                🌀 - {item}
              </Text>
            ))}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableStyle: {
    width: "100%",
    marginBottom: 5,
    padding: 15,
    borderRadius: 4,
    borderColor: "#6A1E55",
    borderWidth: 1.3,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: { marginTop: 10, fontSize: 15 },
  title: { fontWeight: "500", fontSize: 16 },
});

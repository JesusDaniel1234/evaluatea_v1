import React, { useMemo, useRef, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Animated,
} from "react-native";

export default function Acordeon({ texto, titulo }) {
  const [isOpenAcordeon, setIsOpenAcordeon] = useState(false);

  const titleMemo = useMemo(() => titulo);
  const textMemo = useMemo(() => texto);
  return (
    <TouchableOpacity
      style={styles.touchableStyle}
      onPress={() => setIsOpenAcordeon((isOpen) => !isOpen)}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{titleMemo}</Text>
        {isOpenAcordeon ? (
          <AntDesign name="down" size={24} color="black" />
        ) : (
          <AntDesign name="up" size={24} color="black" />
        )}
      </View>
      {isOpenAcordeon && <Text style={styles.text}>{textMemo}</Text>}
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

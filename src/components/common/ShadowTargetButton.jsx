import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function ShadowTargetButton({ children, style, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.targetConatiner, { ...style }]}
    >
      {children}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  targetConatiner: {
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function CircularButton({ styles, children, onPress }) {
  return (
    <TouchableOpacity
      style={[style.touchableOpacity, { ...styles }]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  touchableOpacity: {
    width: 60,
    borderRadius: 50,
    height: 60,
    position: "absolute",
    zIndex: 10,
    bottom: 10,
    right: 10,
  },
});

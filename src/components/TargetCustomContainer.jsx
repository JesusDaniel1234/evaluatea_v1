import React from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";

export default function TargetCustomContainer({ children, style }) {
  return <View style={[styles.targetConatiner, {...style}]}>{children}</View>;
}

const styles = StyleSheet.create({
  targetConatiner: {
    padding: 25,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    // marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

import React from "react";
import { View } from "react-native";
export const ColorComponentRisk = ({ value, styles }) => {
  const color = {
    AR: "red",
    MR: "yellow",
    BR: "green",
    NR: "white",
  };
  const currentColor = color[value]
  return (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: currentColor,
        borderWidth: 0.5,
        borderColor: "black",
        ...styles,
      }}
    ></View>
  );
};

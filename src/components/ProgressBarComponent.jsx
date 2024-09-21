import React from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";

export default function ProgressBarComponent({ index, refIndex, length }) {
  console.group({ index: index, refIndex: refIndex, length: length });
  
  const porFinalState = ((index + 1) / length) * 100;
  const colorBarraState = porFinalState === 100 ? "#17d430" : "#007BFF";
  const changeFinalState =
    refIndex > index
      ? (refIndex / length) * 100
      : ((index + 1) / length) * 100;
  const changeInitialState =
    refIndex > index
      ? ((refIndex + 1) / length) * 100
      : (index / length) * 100;
  const animationProgressBar = {
    from: { width: `${changeInitialState}%` },
    to: { width: `${changeFinalState}%` },
  };

  const backgroundColor = {
    backgroundColor: colorBarraState,
  };

  return (
    <View style={styles.progressBarContainer}>
      <Animatable.View
        style={[styles.progressBarContent, backgroundColor]}
        animation={animationProgressBar}
      ></Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 5,
    backgroundColor: "#cad8d9",
    marginVertical: 10,
    borderRadius: 5,
  },
  progressBarContent: {
    height: "100%",
    borderRadius: 5,
  },
});

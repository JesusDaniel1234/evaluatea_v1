import React from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function QuestionIndex({ index, cantPreguntas }) {
  return (
    <View style={styles.questionNumberContainer}>
      <Text style={styles.textQuestionNumber}>
        Pregunta {index + 1} de {cantPreguntas}
      </Text>
      <MaterialCommunityIcons
        name="file-document-edit-outline"
        size={24}
        color="black"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  questionNumberContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textQuestionNumber: {
    fontSize: 15,
  },
});

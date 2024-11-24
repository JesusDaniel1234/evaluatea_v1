import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TargetQuestionComponent({
  pregunta,
  navigation,
  userToken,
  test,
  testForm,
}) {
  return (
    <TouchableOpacity
      key={pregunta.id}
      style={styles.preguntaCard}
      onPress={() =>
        navigation.navigate(testForm, {
          id: pregunta.id,
          test: test,
          token: userToken,
        })
      }
    >
      <Text numberOfLines={4} style={styles.preguntaText}>
        {pregunta.contenido}
      </Text>
      <View style={styles.preguntaFooter}>
        <View style={styles.dateContainer}>
          <AntDesign name="calendar" size={24} color="black" />
          <Text style={{ fontSize: 14 }}>{pregunta.fecha_corta}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign
            name={pregunta.activa ? "eye" : "eyeo"}
            size={24}
            color="black"
          />
          <Text style={pregunta.activa ? styles.active : styles.inactive}>
            {pregunta.activa ? " Activa" : " Inactiva"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  preguntaCard: {
    width: 160,
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: "auto",
  },
  preguntaText: {
    fontSize: 14,
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  active: {
    color: "green",
  },
  inactive: {
    color: "red",
  },
});

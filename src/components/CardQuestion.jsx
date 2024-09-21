import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import valores_riesgo from "../../assets/PruebasTEA-React-Native/valores_riesgo";

export default function CardQuestion({ pregunta, handleCheckboxChange }) {
  const [checkValue, setCheckValue] = useState("");

  const handleCheckBoxChangeLocal = (value) => {
    setCheckValue(value);
    handleCheckboxChange(pregunta.id, value);
  };

  
  const listaValoresRiesgo = valores_riesgo.find((riesgo) => riesgo.tipos_riesgo == pregunta.tipo_riesgo);
  return (
    <View style={styles.questionCard}>
      <Text style={styles.questionText}>
        <Text style={styles.boldText}>{pregunta.id}</Text> -{" "}
        {pregunta.contenido}
      </Text>
      <RadioButton.Group
        onValueChange={handleCheckBoxChangeLocal}
        value={checkValue}
      >
        {listaValoresRiesgo.valor_riesgo.map((valor, idx) => (
          <View
            style={styles.radioButtonContainer}
            key={idx}
          >
            <RadioButton value={valor} />
            <Text style={styles.text}>{valor}</Text>
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  questionCard: {
    padding: 15,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width:"100%"
  },
  questionText: {
    fontSize: 16,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  text:{ fontSize: 18 },
  radioButtonContainer:{ flexDirection: "row", alignItems: "center" }
});

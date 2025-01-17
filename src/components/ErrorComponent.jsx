import React from "react";
import { Button, Text, View } from "react-native";

export default function ErrorComponent({retry}) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        marginTop: 20,
      }}
    >
      <Text style={{ color: "red", marginBottom: 10 }}>
        Error al cargar las preguntas.
      </Text>
      <Button title="Volver a intentar" onPress={retry} />
    </View>
  );
}

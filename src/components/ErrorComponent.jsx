import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ErrorComponent({ retry }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, textAlign: "center" }}>
        Ha ocurrido un error de conexión.
      </Text>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Vuelva a Intentarlo.
      </Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={retry}>
        <Text style={styles.bottonText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottonText: {
    color:"blue",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    borderColor:"blue",
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
  },
});
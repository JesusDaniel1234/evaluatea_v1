import React, { useEffect, useState } from "react";
import { serverConected } from "../api/api.base";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { constant } from "../constants/constants";
export default function SplashScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkApiConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await serverConected();
      if (response.status === 200 && response.data.message === "OK") {
        navigation.replace("Inicio");
      } else {
        throw new Error("API no disponible");
      }
    } catch (error) {
      setError(error);
      console.error("Error al conectar con la API:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkApiConnection();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading && error === null && (
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.text}>Conectando con el Servidor</Text>
        </View>
      )}

      {error != null && (
        <View>
          <Text>Ha ocurrido un Error</Text>
          <Button title="Reintentar" onPress={checkApiConnection} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: constant.primaryColor
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 16,
  },
});

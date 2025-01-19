import React, { useEffect, useState } from "react";
import { serverConected } from "../api/api.base";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { constant } from "../constants/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkApiConnection();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.presenntationTitle}>
          Bienvenido a EvalúaTEA
          <MaterialCommunityIcons
            name="face-man-profile"
            size={50}
            color="#e68a00"
          />
        </Text>
      </View>
      {loading && error === null && (
        <View>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.text}>Conectando con el Servidor</Text>
        </View>
      )}

      {error != null && (
        <View>
          <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
            Ha ocurrido un error de conexión.
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Vuelva a Intentarlo.
          </Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={checkApiConnection}
          >
            <Text style={styles.bottonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: constant.primaryColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 20,
    color: "white",
  },
  bottonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    borderColor: "white",
    padding: 12,
    borderWidth: 1,
    borderRadius: 4,
  },
  presenntationTitle: {
    fontSize: 50,
    fontWeight: "500",
    textAlign: "center",
    color: "#e68a00",
    marginVertical: 40,
  },
});

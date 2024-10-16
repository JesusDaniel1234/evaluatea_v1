import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native";
import { UserContext } from "../../context/UserProvider";
import LoadingSpinnerComponent from "../../components/LoadingSpinnerComponent";
import { useLoading } from "../../hooks/Loading";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const Login = ({ navigation }) => {
  const { signIn } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, handleLogin] = useLoading(async () => {
    const usuario = {
      username,
      password,
    };
    try {
      await signIn(usuario);
      navigation.navigate("Inicio");
      Alert.alert("Login Successful");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Login failed. Please check your credentials.");
    }
  });

  if (loading) return <LoadingSpinnerComponent />;

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <View style={styles.targetContainer}>
        <Text style={styles.presenntationTitle}>
          Bienvenido a EvalúaTEA
          <MaterialCommunityIcons
            name="face-man-profile"
            size={35}
            color="#e68a00"
          />
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTextContainer}>Nombre de Usuario</Text>
            <TextInput
              style={styles.inputStyles}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              keyboardType="ascii-capable"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTextContainer}>Contraseña</Text>
            <TextInput
              style={styles.inputStyles}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  presenntationTitle: {
    fontSize: 35,
    fontWeight: "500",
    textAlign: "center",
    color: "#e68a00",
    marginVertical: 40,
  },
  titleLogin: { fontSize: 25, fontWeight: "500", marginVertical: 15 },
  targetContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "95%",
    marginTop: 40,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  inputContainer: { marginBottom: 10 },
  inputTextContainer: { fontSize: 16, marginBottom: 10 },
  inputStyles: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
  },
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    marginVertical: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

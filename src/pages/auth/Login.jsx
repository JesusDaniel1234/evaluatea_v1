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

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(true)
  const { signIn } = useContext(UserContext);
  const handleLogin = async () => {
    const usuario = {
      username: username,
      password: password,
    };

    try {
      await signIn(usuario);
      navigation.navigate("Inicio");
      Alert.alert("Login Successful");
    } catch (error) {
      Alert.alert("Error", "Login failed. Please check your credentials.");
    }
  };

  return (
    <ScrollView
      style={{ padding: 20 }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.targetContainer}>
        <Text style={styles.titleLogin}>Iniciar Sesión</Text>
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
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  titleLogin: { fontSize: 25, fontWeight: "500", marginVertical: 15 },
  targetContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "95%",
    marginTop: 10,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});

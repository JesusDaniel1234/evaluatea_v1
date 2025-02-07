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
import Entypo from "@expo/vector-icons/Entypo";
import { formCommonStyles } from "../../constants/formCommonStyles";
import TargetCustomContainer from "../../components/TargetCustomContainer";
import ModalComponent from "../../components/ModalComponent";

const Login = ({ navigation }) => {
  const { signIn } = useContext(UserContext);
  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [modalLoading, setModalLoading] = useState(false);

  const [loading, handleLogin] = useLoading(async () => {
    const usuario = {
      username,
      password,
    };
    setModalLoading(true);
    try {
      await signIn(usuario);
      navigation.navigate("Inicio");
      Alert.alert(`Sesión Iniciada Correctamente: Bienvenido ${username}`);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Ha ocurrido un error al iniciar sesión. Por favor revise sus credenciales."
      );
    } finally {
      setModalLoading(false);
    }
  });

  if (loading) return <LoadingSpinnerComponent />;

  return (
    <ScrollView contentContainerStyle={styles.conatinerStyle}>
      <ModalComponent loading={modalLoading} />
      <TargetCustomContainer>
        <Text style={styles.presenntationTitle}>
          Bienvenido a EvalúaTEA
          <MaterialCommunityIcons
            name="face-man-profile"
            size={35}
            color="#e68a00"
          />
        </Text>
        <View style={styles.formContainer}>
          <View style={formCommonStyles.formGroup}>
            <Text style={formCommonStyles.subTitle}>Nombre de Usuario</Text>
            <TextInput
              style={formCommonStyles.inputStyles}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              keyboardType="ascii-capable"
              autoCapitalize="none"
            />
          </View>
          <View
            style={{
              marginBottom: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={formCommonStyles.subTitle}>Contraseña</Text>
              <TextInput
                style={formCommonStyles.inputStyles}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
            </View>
            <Entypo
              name={showPassword ? "eye-with-line" : "eye"}
              size={24}
              style={{
                padding: 9,
                top: 5,
                borderColor: "black",
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 8,
                marginLeft:3
              }}
              color="black"
              onPress={toggleShowPassword}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </TargetCustomContainer>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  conatinerStyle: { paddingHorizontal: 10, paddingVertical: 10 },
  presenntationTitle: {
    fontSize: 35,
    fontWeight: "500",
    textAlign: "center",
    color: "#e68a00",
    marginVertical: 40,
  },
  titleLogin: { fontSize: 25, fontWeight: "500", marginVertical: 15 },
  formContainer: {
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

import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../context/UserProvider";

export default function UserInfoDrawerComponent({ navigation }) {
  const { userData } = useContext(UserContext);

  if (userData) {
    const { imagen_perfil, usuario } = userData;
    const { email, first_name, last_name } = usuario;
    const name = first_name + " " + last_name;
    return (
      <TouchableOpacity
        style={styles.userAreaContentAuth}
        onPress={() => navigation.navigate("Perfil")}
      >
        <Image source={{ uri: imagen_perfil }} style={styles.userImageStyle} />
        <View style={styles.userContentInfo}>
          <Text style={styles.userNameContentAuth}>{name}</Text>
          <Text>{email}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.userAreaContent}
      onPress={() => navigation.navigate("Login")}
    >
      <View style={styles.userContentInfo}>
        <Text style={styles.userNameContent}>Bienvenido a EvalúaTEA</Text>
        <Text style={styles.userInfoContent}>Presione para Iniciar Sesión</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  userAreaContentAuth: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  userAreaContent: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  userImageStyle: { height: 80, width: 80, borderRadius: 50 },
  userContentInfo: { justifyContent: "center", paddingHorizontal: 10, flex: 1 },
  userNameContent: { fontWeight: "800", fontSize: 24 },
  userNameContentAuth: { fontWeight: "500", fontSize: 18 },
  userInfoContent: { fontSize: 15 },
});

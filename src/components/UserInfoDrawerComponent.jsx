import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UserInfoDrawerComponent({ navigation, userToken }) {
  const image = require("../../assets/autism_image.jpg");
  const userName = "Jesús Daniel Sánchez Alarcón";
  const profesion = "Ingeniero de Software";

  if (userToken) {
    return (
      <TouchableOpacity
        style={styles.userAreaContentAuth}
        onPress={() => navigation.navigate("Perfil")}
      >
        <Image source={image} style={styles.userImageStyle} />
        <View style={styles.userContentInfo}>
          <Text style={styles.userNameContentAuth}>{userName}</Text>
          <Text>{profesion}</Text>
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
	userNameContentAuth:{fontWeight: "500", fontSize: 18},
	userInfoContent:{fontSize:15}
});

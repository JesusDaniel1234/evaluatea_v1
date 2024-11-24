import React from "react";
import TargetCustomContainer from "../TargetCustomContainer";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableNativeFeedback,
  TouchableHighlight,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ShadowTargetButton from "../common/ShadowTargetButton";

export default function TPatientItem({ item, db, navigation }) {
  const deletePatient = async (id) => {
    Alert.alert("Confirmación", "¿Estás Seguro?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: async () => {
          try {
            await db.runAsync("DELETE FROM patient WHERE id = $id", {
              $id: id,
            });
            navigation.reset({
              index: 0,
              routes: [{ name: "Pacientes" }],
            });
          } catch (e) {
            console.error(e);
          }
        },
        style: "destructive",
      },
    ]);
  };
  return (
    <ShadowTargetButton
      style={style.container}
      onPress={() => navigation.navigate("FromularioPaciente", { patient: item })}
    >
      <View style={{ width: "90%" }}>
        <Text style={{ fontSize: 14 }}>
          <Text style={{ fontWeight: "500" }}>CI: </Text> {item.CI}
        </Text>
        <Text style={{ fontSize: 14 }}>
          <Text style={{ fontWeight: "500" }}>Nombre: </Text> {item.patient}
        </Text>
        <Text style={{ fontSize: 14 }}>
          <Text style={{ fontWeight: "500" }}>Tutor: </Text> {item.mentor}
        </Text>
      </View>
      <TouchableOpacity
        style={style.deleteButton}
        onPress={() => deletePatient(item.id)}
      >
        <FontAwesome name="trash-o" size={24} color="black" />
      </TouchableOpacity>
    </ShadowTargetButton>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "#d9534f",
    borderRadius: 4,
  },
});

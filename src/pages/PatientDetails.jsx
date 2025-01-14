import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Alert,
  ToastAndroid,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { detallesPacienteSimp, eliminarPaciente } from "../api/api.paciente";
import TargetCustomContainer from "../components/TargetCustomContainer.jsx";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent.jsx";
import { DataTable } from "react-native-paper";
import { UserContext } from "../context/UserProvider.jsx";
import { formCommonStyles } from "../constants/formCommonStyles.js";
import { constant } from "../constants/constants.js";

export default function PatientDetails({ navigation, route }) {
  const { id } = route.params.patient;
  const { userToken } = useContext(UserContext);
  const [patient, setPatient] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
    async function loadData() {
      setLoading(true);
      try {
        const response = await detallesPacienteSimp(id);
        console.log(response.data);
        if (response.data.paciente) setPatient(response.data.paciente);
        if (response.data.tests) setTests(response.data.tests);
        console.log(patient);

        console.log(tests);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleDelete = async () => {
    Alert.alert(
      "Confirmación",
      "Se eliminarán los tests referidos a este paciente. ¿Estás Seguro?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: async () => {
            await eliminarPaciente(id);

            ToastAndroid.show("Paciente Eliminado", ToastAndroid.SHORT);
            navigation.reset({
              index: 0,
              routes: [{ name: "Informe General" }],
            });
          },
          style: "destructive",
        },
      ]
    );
  };

  if (loading) return <LoadingSpinnerComponent />;

  return (
    <ScrollView style={styles.container}>
      <TargetCustomContainer>
        <View style={formCommonStyles.header}>
          <Text style={formCommonStyles.titleHeader}>Datos del Paciente</Text>
        </View>
        {patient && (
          <View style={{ marginBottom: 16, flexDirection: "column", gap: 10 }}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "500", fontSize: 15 }}>
                Tarjeta de Menor:
              </Text>
              <Text style={{ fontWeight: "400", fontSize: 15 }}>
                {patient.tarjeta_menor}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "500", fontSize: 15 }}>Nombre:</Text>
              <Text style={{ fontWeight: "400", fontSize: 15 }}>
                {patient.nombre_paciente}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "500", fontSize: 15 }}>Edad:</Text>
              <Text style={{ fontWeight: "400", fontSize: 15 }}>
                {patient.edad_paciente_meses} Meses
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontWeight: "500", fontSize: 15 }}>Tutor:</Text>
              <Text style={{ fontWeight: "400", fontSize: 15 }}>
                {patient.nombre_tutor}
              </Text>
            </View>
          </View>
        )}
        <View>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 17,
              color: constant.primaryColor,
            }}
          >
            Tests Realizados:
          </Text>
        </View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Test</DataTable.Title>
            <DataTable.Title numeric>Puntuación</DataTable.Title>
            <DataTable.Title numeric>Valoración</DataTable.Title>
            <DataTable.Title numeric>Fecha</DataTable.Title>
          </DataTable.Header>

          {tests.length > 0 &&
            tests.map((item) => (
              <TouchableOpacity
                key={item.respuesta.id}
                onPress={() =>
                  navigation.navigate("DetallesResultados", {
                    id: item.respuesta.id,
                    token: userToken,
                    test: item.tipo,
                  })
                }
              >
                <DataTable.Row>
                  <DataTable.Cell>{item.tipo}</DataTable.Cell>
                  <DataTable.Cell numeric style={{ justifyContent: "center" }}>
                    {item.respuesta.puntuacion}
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={{ justifyContent: "center" }}>
                    {item.respuesta.valoracion}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>
                    {item.respuesta.fecha_corta}
                  </DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            ))}

          {tests.length === 0 && (
            <Text
              style={{
                fontWeight: "500",
                textAlign: "center",
                paddingVertical: 10,
                fontSize: 20,
              }}
            >
              No hay resultrados
            </Text>
          )}
        </DataTable>
        <View style={styles.formGroup}>
          <Text style={styles.description}>
            Puede navegar entre los distintos test realizados por el paciente, y
            visualizar los resultados a detalle.
          </Text>
        </View>
        <View style={formCommonStyles.buttonContainer}>
          <TouchableOpacity
            style={formCommonStyles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={formCommonStyles.buttonTextCancel}>Volver</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={formCommonStyles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={formCommonStyles.buttonTextDelete}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </TargetCustomContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, paddingVertical: 10 },
  formGroup: {
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: "#888",
  },
});

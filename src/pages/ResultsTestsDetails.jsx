import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ToastAndroid,
} from "react-native";
import TargetCustomContainer from "../components/TargetCustomContainer";
import { testDetailsResults } from "../constants/testDetailsResults";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent";
import { constant } from "../constants/constants";
import { formCommonStyles } from "../constants/formCommonStyles";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from "@expo/vector-icons/AntDesign";
import { eliminarRespuestasTest } from "../utils/GestionRespuestasTest";
import ErrorComponent from "../components/ErrorComponent";
import ModalComponent from "../components/ModalComponent";

export default function ResultsTestsDetails({ navigation, route }) {
  const test = route.params.test;
  const token = route.params.token;
  const id = route.params.id;
  const [respuestas, setRespuestas] = useState([]);
  const [datosPersonales, setDatosPersonales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalLoading, setModalLoading] = useState(false);

  async function loadResults() {
    setLoading(true);
    setError(null);
    try {
      const resp = await testDetailsResults[test](id, token);
      setDatosPersonales([resp.data.datos_personales]);
      setRespuestas(resp.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

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

    loadResults();
  }, [test, token, id]);

  const handleDelete = async () => {
    Alert.alert("Confirmación", "¿Estás Seguro?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: async () => {
          setModalLoading(true);
          try {
            await eliminarRespuestasTest[test](id, token);
            navigation.reset({
              index: 0,
              routes: [{ name: "ListarResultados", params: { test: test } }],
            });
          } catch (e) {
            ToastAndroid.show("Ha ocurrido un error.", ToastAndroid.SHORT);
          } finally {
            setModalLoading(false);
          }
        },
        style: "destructive",
      },
    ]);
  };

  if (loading) return <LoadingSpinnerComponent />;
  if (error) return <ErrorComponent retry={loadResults} />;

  return (
    <ScrollView style={styles.container}>
      <ModalComponent loading={modalLoading} />
      <TargetCustomContainer>
        <View style={[formCommonStyles.header, { marginBottom: 15 }]}>
          <Text style={styles.title}>Resultados-Tests {test}</Text>
          <Foundation
            name="results-demographics"
            size={30}
            color={constant.primaryColor}
          />
        </View>

        <View style={styles.responsesContent}>
          {datosPersonales &&
            datosPersonales.map((datos) => (
              <View key={datos.id} style={{ width: "85%" }}>
                <Text style={{ fontSize: 13 }}>
                  <Text style={styles.label}>CI: </Text>
                  01062279907
                </Text>
                <Text style={{ fontSize: 13 }}>
                  <Text style={styles.label}>Paciente: </Text>
                  {datos.nombre_paciente}
                </Text>
                <Text style={{ fontSize: 13 }}>
                  <Text style={styles.label}>Edad en meses: </Text>
                  {datos.edad_paciente_meses}
                </Text>
                <Text style={{ fontSize: 13 }}>
                  <Text style={styles.label}>Tutor: </Text> {datos.nombre_tutor}
                </Text>
              </View>
            ))}
          <View style={styles.scoreContainer}>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 10,
                marginVertical: 0,
              }}
            >
              Puntos
            </Text>
            <Text style={styles.scoreText}>{respuestas.puntuacion}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>Respuestas:</Text>
          {respuestas &&
            respuestas.respuestas.map((pregunta, index) => (
              <View key={pregunta.id} style={styles.questionContainer}>
                <Text style={{ fontSize: 14 }}>
                  {index + 1} - {pregunta.pregunta.contenido}
                </Text>
                <Text style={styles.answerText}>
                  {test === "MChatR"
                    ? pregunta.respuesta.toLowerCase()
                    : pregunta.respuesta.valor}
                </Text>

                <View style={styles.separator}></View>
              </View>
            ))}
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
        </View>
      </TargetCustomContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: constant.primaryColor,
  },
  responsesContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontWeight: "bold",
  },

  scoreContainer: {
    backgroundColor: "red",
    borderRadius: 4,
    width: "15%",
    paddingVertical: 5,
  },
  scoreText: {
    fontSize: 26,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 10,
  },
  answerText: {
    color: "blue",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "right",
    paddingHorizontal: 10,
  },
  separator: {
    height: 3,
    backgroundColor: constant.primaryColor,
    marginVertical: 5,
  },
});

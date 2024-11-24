import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TargetCustomContainer from "../components/TargetCustomContainer";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { testDetailsResults } from "../constants/testDetailsResults";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent";
export default function ResultsTestsDetails({ navigation, route }) {
  const test = route.params.test;
  const token = route.params.token;
  const id = route.params.id;

  const [respuestas, setRespuestas] = useState([]);
  const [datosPersonales, setDatosPersonales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResults() {
      setLoading(true);
      try {
        const resp = await testDetailsResults[test](id, token);
        console.log(resp);
        setDatosPersonales([resp.data.datos_personales]);
        setRespuestas(resp.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadResults();
  }, [test, token, id]);

  if (loading) return <LoadingSpinnerComponent />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TargetCustomContainer>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ListarResultados", { test: test })
            }
            style={styles.backButton}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Resultados-Tests {test}</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton}>
            <FontAwesome name="trash-o" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {datosPersonales &&
          datosPersonales.map((datos) => (
            <View key={datos.id} style={styles.infoContainer}>
              <Text>
                <Text style={styles.label}>CI: </Text>
                01062279907
              </Text>
              <Text>
                <Text style={styles.label}>Paciente: </Text>
                {datos.nombre_paciente}
              </Text>
              <Text>
                <Text style={styles.label}>Edad en meses: </Text>
                {datos.edad_paciente_meses}
              </Text>
              <Text>
                <Text style={styles.label}>Tutor: </Text> {datos.nombre_tutor}
              </Text>
            </View>
          ))}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            <Text style={styles.label}>Puntuación de Riesgo:</Text>{" "}
            {respuestas.puntuacion}
          </Text>
        </View>
        <View>
          <Text style={styles.subTitle}>Respuestas a las preguntas:</Text>
          {respuestas &&
            respuestas.respuestas.map((pregunta, index) => (
              <View key={pregunta.id} style={styles.questionContainer}>
                <Text>
                  <Text style={styles.label}>{index + 1} -</Text>{" "}
                  {pregunta.pregunta.contenido}
                </Text>
                <Text style={styles.answerText}>
                  <Text style={styles.label}>Respuesta - </Text>
                  {test === "MChatR"
                    ? pregunta.respuesta
                    : pregunta.respuesta.valor}
                </Text>
                <View style={styles.separator}></View>
              </View>
            ))}
        </View>
      </TargetCustomContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  infoContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
  },
  scoreContainer: {
    marginVertical: 10,
  },
  scoreText: {
    fontSize: 16,
    color: "red",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  questionContainer: {
    marginBottom: 15,
  },
  answerText: {
    color: "blue",
  },
  separator: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
});

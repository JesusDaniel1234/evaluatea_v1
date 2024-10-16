import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import useLoadQuestionTests from "../hooks/LoadQuestionTests";
import { UserContext } from "../context/UserProvider";
import Acordeon from "../components/Acordeon";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent";
import { listaContenidosMChatR } from "../utils/ContenidosAcordeon";
import TargetQuestionComponent from "../components/TargetQuestionComponent";
import { useContext } from "react";

function ListQuestionsTests({ navigation, route }) {
  const { userToken } = useContext(UserContext);
  const { preguntas, loading } = useLoadQuestionTests(
    userToken,
    route.params.test
  );

  const toFormMCHatR = () =>
    navigation.reset({
      index: 0,
      routes: [{ name: "FormMChatR", params: { id: null, token: userToken } }],
    });

  if (loading) return <LoadingSpinnerComponent />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Gestión de Preguntas</Text>
        </View>
        {listaContenidosMChatR.map((elemento, index) => (
          <Acordeon
            key={index}
            titulo={elemento.titulo}
            texto={elemento.contenido}
          />
        ))}
        <TouchableOpacity style={styles.createButton} onPress={toFormMCHatR}>
          <Text style={styles.createButtonText}>Crear Pregunta</Text>
        </TouchableOpacity>
        <FlatList
          data={preguntas}
          renderItem={({ item }) => (
            <TargetQuestionComponent
              pregunta={item}
              navigation={navigation}
              userToken={userToken}
            />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          numColumns={2}
        />
      </View>
    </ScrollView>
  );
}

export default ListQuestionsTests;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    padding: 16,
  },
  header: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  descriptionContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  createButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

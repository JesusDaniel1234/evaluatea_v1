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
import { infoTests } from "../utils/ContenidosAcordeon";
import TargetQuestionComponent from "../components/TargetQuestionComponent";
import { useContext } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CircularButton } from "../components/common/CircularButton.jsx";
function ListQuestionsTests({ navigation, route }) {
  const { userToken } = useContext(UserContext);
  const { preguntas, loading } = useLoadQuestionTests(
    userToken,
    route.params.test
  );

  const test = route.params.test;

  const TypeTest = {
    MChatR: "FormMChatR",
    QChat: "FormQChat",
    QChat10: "FormQChat10",
  };

  const toForm = () =>
    navigation.reset({
      index: 0,
      routes: [
        {
          name: TypeTest[test],
          params: { id: null, token: userToken, test: test },
        },
      ],
    });

  if (loading) return <LoadingSpinnerComponent />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Gestión de Preguntas</Text>
        </View>
        {infoTests[test].map((elemento, index) => (
          <Acordeon key={index} elemento={elemento} />
        ))}

        <TouchableOpacity style={styles.createButton} onPress={toForm}>
          <Text style={styles.createButtonText}>Crear Pregunta</Text>
          <AntDesign name="addfile" size={20} color="white" />
        </TouchableOpacity>

        <FlatList
          data={preguntas}
          renderItem={({ item }) => (
            <TargetQuestionComponent
              testForm={TypeTest[test]}
              test={test}
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
    marginTop: 5,
    marginBottom: 10,
    width: "50%",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  createButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});

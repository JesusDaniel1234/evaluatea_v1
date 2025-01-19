import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import useLoadQuestionTests from "../hooks/LoadQuestionTests";
import { UserContext } from "../context/UserProvider";
import Acordeon from "../components/Acordeon";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent";
import { infoTests } from "../utils/ContenidosAcordeon";
import TargetQuestionComponent from "../components/TargetQuestionComponent";
import { useContext } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import CircularButton from "../components/common/CircularButton.jsx";
import ErrorComponent from "../components/ErrorComponent.jsx";

function ListQuestionsTests({ navigation, route }) {
  const { userToken } = useContext(UserContext);
  const { preguntas, loading, error, retry } = useLoadQuestionTests(
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
  if (error) return <ErrorComponent retry={retry} />

  return (
    <View style={{ flex: 1 }}>
      <CircularButton onPress={toForm}>
        <View style={styles.buttonStyle}>
          <Text style={styles.createButtonText}>
            <AntDesign name="plus" size={30} color="white" />
          </Text>
        </View>
      </CircularButton>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>
          <View style={{ marginBottom: 10 }}>
            {infoTests[test].map((elemento, index) => (
              <Acordeon key={index} elemento={elemento} />
            ))}
          </View>

          {preguntas.length === 0 && (
            <Text
              style={{
                fontWeight: "500",
                textAlign: "center",
                paddingVertical: 10,
                fontSize: 20,
              }}
            >
              No hay preguntas
            </Text>
          )}

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
    </View>
  );
}

export default ListQuestionsTests;

const styles = StyleSheet.create({
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
  buttonStyle: {
    backgroundColor: "#181818",
    justifyContent: "center",
    width: 60,
    borderRadius: 50,
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  createButtonText: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 30,
  },
});

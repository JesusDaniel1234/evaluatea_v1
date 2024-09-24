import { ScrollView, View, StyleSheet, Text } from "react-native";
import Acordeon from "../../components/Acordeon.jsx";
import data from "../../../assets/PruebasTEA-React-Native/qchat_preguntas.js";
import { listaContenidosQChat } from "../../utils/ContenidosAcordeon.js";
import { useQuestionLogic } from "../../hooks/QuestionLogic.jsx";

import RadioButtonComponent from "../../components/RadioButtonComponent.jsx";
import ProgressBarComponent from "../../components/ProgressBarComponent.jsx";
import { NavigationButtons } from "../../components/NavigationButtonsComponents.jsx";
import { RadioButton } from "react-native-paper";
import QuestionIndex from "../../components/QuestionIndex.jsx";
import { useLoadQuestionQChat } from "../../hooks/LoadQuestionsActives.jsx";
import LoadingSpinnerComponent from "../../components/LoadingSpinnerComponent.jsx";

// Function to count points based on checked answers
const conteoPuntos = (preguntas, checkedList) => {
  let puntos = 0;

  for (let i = 0; i < preguntas.length; i++) {
    const pregunta = preguntas[i];
    const checkedItem = checkedList.find(
      (item) => String(pregunta.id) === item.id
    );

    if (checkedItem) {
      if (
        pregunta.rango_riesgo.rango.startsWith("Más") ||
        pregunta.rango_riesgo.rango.startsWith("Mayor")
      ) {
        puntos += Number(checkedItem.value);
      } else {
        puntos += 4 - Number(checkedItem.value);
      }
    }
  }
  return { puntos, checkedList };
};

function QChat() {
  const { preguntas, loading } = useLoadQuestionQChat();

  const {
    cantPreguntas,
    preguntActual,
    checkValue,
    handleCheckBoxChange,
    SiguienteBoton,
    AnteriorBoton,
    index,
    indexState,
  } = useQuestionLogic(preguntas);

  if (loading) return <LoadingSpinnerComponent />;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {listaContenidosQChat.map((elmento, index) => {
        return (
          <Acordeon
            key={index}
            titulo={elmento.titulo}
            texto={elmento.contenido}
          />
        );
      })}

      <View style={styles.targetContainer}>
        <QuestionIndex index={index} cantPreguntas={cantPreguntas} />
        <ProgressBarComponent
          index={index}
          refIndex={indexState.current}
          length={cantPreguntas}
        />

        {preguntActual.map((pregunta) => (
          <View key={pregunta.id}>
            <Text style={styles.textContentQuestion}>{pregunta.contenido}</Text>
            <RadioButton.Group
              onValueChange={handleCheckBoxChange}
              value={checkValue}
            >
              {pregunta.obtener_valores_riesgo.map((valor, index) => {
                return (
                  <RadioButtonComponent
                    key={index}
                    label={valor.valor}
                    value={valor.orden}
                  />
                );
              })}
            </RadioButton.Group>
          </View>
        ))}

        <NavigationButtons
          index={index}
          onPrevious={AnteriorBoton}
          onNext={SiguienteBoton}
          totalQuestions={cantPreguntas}
        />
      </View>
    </ScrollView>
  );
}

export default QChat;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  targetContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "95%",
    marginTop: 10,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  textContentQuestion: {
    fontSize: 18,
  },
});

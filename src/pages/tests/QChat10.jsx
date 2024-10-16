import { ScrollView, View, StyleSheet, Text } from "react-native";
import Acordeon from "../../components/Acordeon.jsx";
import { listaContenidosQChat } from "../../utils/ContenidosAcordeon.js";
import { useQuestionLogic } from "../../hooks/QuestionLogic.jsx";
import RadioButtonComponent from "../../components/RadioButtonComponent.jsx";
import ProgressBarComponent from "../../components/ProgressBarComponent.jsx";
import { NavigationButtons } from "../../components/NavigationButtonsComponents.jsx";
import { RadioButton } from "react-native-paper";
import QuestionIndex from "../../components/QuestionIndex.jsx";
import { useLoadQuestionQChat10 } from "../../hooks/LoadQuestionsActives.jsx";
import LoadingSpinnerComponent from "../../components/LoadingSpinnerComponent.jsx";

function QChat10({ navigation }) {
  const { preguntas, loading } = useLoadQuestionQChat10();
  const {
    cantPreguntas,
    preguntActual,
    checkValue,
    handleCheckBoxChange,
    SiguienteBoton,
    AnteriorBoton,
    index,
    indexState,
    abrirFormulario,
  } = useQuestionLogic({
    data: preguntas,
    navigation: navigation,
    test: "QChat10",
  });

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
          openForm={abrirFormulario}
          index={index}
          onPrevious={AnteriorBoton}
          onNext={SiguienteBoton}
          totalQuestions={cantPreguntas}
        />
      </View>
    </ScrollView>
  );
}

export default QChat10;

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
  questionNumberContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  textQuestionNumber: {
    fontSize: 15,
  },
  textContentQuestion: { fontSize: 18 },
});

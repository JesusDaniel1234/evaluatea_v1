import { ScrollView, View,  StyleSheet, Text } from "react-native";
import Acordeon from "../../components/Acordeon.jsx";
import data from "../../../assets/PruebasTEA-React-Native/qchat10_preguntas.js";
import { listaContenidosQChat } from "../../utils/ContenidosAcordeon.js";
import { useQuestionLogic } from "../../hooks/QuestionLogic.jsx";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import RadioButtonComponent from "../../components/RadioButtonComponent.jsx";
import ProgressBarComponent from "../../components/ProgressBarComponent.jsx";
import { NavigationButtons } from "../../components/NavigationButtonsComponents.jsx";
import { RadioButton } from "react-native-paper";

function QChat10() {
  const {
    cantPreguntas,
    preguntActual,
    checkValue,
    handleCheckBoxChange,
    SiguienteBoton,
    AnteriorBoton,
    index,
    indexState,
  } = useQuestionLogic(data);
  console.log("Pregunta Actual :",preguntActual)

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
        <View style={styles.questionNumberContainer}>
          <Text style={styles.textQuestionNumber}>
            Pregunta {index + 1} de {cantPreguntas}
          </Text>
          <MaterialCommunityIcons
            name="file-document-edit-outline"
            size={24}
            color="black"
          />
        </View>

        <ProgressBarComponent
          index={index}
          refIndex={indexState.current}
          length={cantPreguntas}
        />

        {preguntActual.map((pregunta) => (
          <View key={pregunta.id}>
            <Text style={{ fontSize: 18 }}>{pregunta.contenido}</Text>
            <RadioButton.Group
              onValueChange={handleCheckBoxChange}
              value={checkValue}
            >
              {pregunta.valores_riesgo.map((valor, index) => {
                return (
                  <RadioButtonComponent
                    key={index}
                    label={valor}
                    value={valor}
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
});

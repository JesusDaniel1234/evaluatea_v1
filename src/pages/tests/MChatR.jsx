import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Acordeon from "../../components/Acordeon.jsx";
import RadioButtonComponent from "../../components/RadioButtonComponent.jsx";
import { listaContenidosMChatR } from "../../utils/ContenidosAcordeon.js";
import ProgressBarComponent from "../../components/ProgressBarComponent.jsx";
import { NavigationButtons } from "../../components/NavigationButtonsComponents.jsx";
import { useQuestionLogic } from "../../hooks/QuestionLogic.jsx";
import data from "../../../assets/PruebasTEA-React-Native/mchatr_preguntas.js";

function MChatR() {
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {listaContenidosMChatR.map((elemento, index) => {
        return (
          <Acordeon
            key={index}
            titulo={elemento.titulo}
            texto={elemento.contenido}
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
          <Text key={pregunta.id} style={{ fontSize: 18 }}>
            {pregunta.contenido}
          </Text>
        ))}

        <RadioButton.Group
          onValueChange={handleCheckBoxChange}
          value={checkValue}
        >
          <RadioButtonComponent label={"Si"} value={"SI"} />
          <RadioButtonComponent label={"No"} value={"NO"} />
        </RadioButton.Group>

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

export default MChatR;

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
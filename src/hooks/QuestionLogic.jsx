import { useRef, useState } from "react";
import { ToastAndroid } from "react-native";
import { conteoPuntos } from "../utils/PointsCount";

const formatResponsesTests = (isChecked, test) => {
  if (test === "MChatR") {
    const respuestas = [];
    isChecked.current.map((valor) => {
      respuestas.push({
        pregunta: valor.id,
        respuesta: valor.value,
      });
    });
    return respuestas;
  }
  return isChecked.current;
};

export const useQuestionLogic = ({ data, navigation, test }) => {
  const [checkValue, setCheckValue] = useState(null);
  const [index, setIndex] = useState(0);
  const isChecked = useRef([]);
  const indexState = useRef(0);
  const pregunta = data;
  const cantPreguntas = pregunta.length;
  const idPreguntas = pregunta.map((pregunta) => pregunta.id);
  const preguntActual = pregunta.filter(
    (pregunta) => pregunta.id === idPreguntas[index]
  );

  const SiguienteBoton = () => {
    if (index === 0) indexState.current = 0;
    if (checkValue === null) {
      showToast("Seleccione una respuesta antes de continuar.");
      return;
    }

    const id = idPreguntas[index];
    if (index < pregunta.length - 1) {
      setIndex((index) => index + 1);
    }

    const newValue = { id, value: checkValue };
    isChecked.current = [
      ...isChecked.current.filter((item) => item.id !== id),
      newValue,
    ];
    setCheckValue(null);
  };

  const AnteriorBoton = () => {
    indexState.current = index;
    if (index === 0) return;
    setIndex((index) => index - 1);
    if (index === 1) {
      isChecked.current = [];
      setCheckValue(null);
      return;
    }
    const id = idPreguntas[index];
    isChecked.current = isChecked.current.filter((item) => item.id !== id);
    setCheckValue(null);
  };

  const VolverInicio = () => {
    setIndex(0);
    isChecked.current = [];
    setCheckValue(null);
    indexState.current = 0;
  };

  const handleCheckBoxChange = (value) => {
    setCheckValue(value);
  };
  const showToast = (message) => ToastAndroid.show(message, ToastAndroid.SHORT);

  const abrirFormulario = () => {
    if (checkValue === null) {
      showToast("Seleccione una respuesta antes de continuar.");
      return;
    }
    if (isChecked.length < pregunta.length) {
      const id = idPreguntas[index];
      const newValue = { id, value: checkValue };
      isChecked.current = [...isChecked.current, newValue];
    }

    // abrir formulario
    const points = conteoPuntos[test](pregunta, isChecked.current);

    navigation.navigate("FromularioTest", {
      test: test,
      points: points,
      checkedList: formatResponsesTests(isChecked, test),
    });
  };

  return {
    cantPreguntas,
    idPreguntas,
    preguntActual,
    checkValue,
    handleCheckBoxChange,
    SiguienteBoton,
    AnteriorBoton,
    isChecked,
    index,
    indexState,
    abrirFormulario,
    VolverInicio,
  };
};

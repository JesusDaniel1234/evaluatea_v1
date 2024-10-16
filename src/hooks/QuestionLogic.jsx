import { useRef, useState } from "react";
import { ToastAndroid } from "react-native";

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

  const handleCheckBoxChange = (value) => {
    setCheckValue(value);
  };
  const showToast = (message) => ToastAndroid.show(message, ToastAndroid.SHORT);

  const abrirFormulario = () => {
    console.log("Este es check value:", checkValue);
    if (checkValue === null) {
      showToast("Seleccione una respuesta antes de continuar.");
      return;
    }

    const id = idPreguntas[index];
    const newValue = { id, value: checkValue };
    isChecked.current = [...isChecked.current, newValue];
    console.log("este es el test", test);
    // abrir formulario
    navigation.navigate("FromularioTest", { test: test });
    console.log(isChecked);
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
  };
};

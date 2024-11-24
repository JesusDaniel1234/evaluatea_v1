import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useForm, Controller } from "react-hook-form";
import { crearPaciente } from "../api/api.paciente";
import { constant } from "../constants/constants";
import { crearRespuestas, crearRespuestasTutor } from "../utils/GestionRespuestasTest";

export default function ModalFormTest({ navigation, route }) {
  
  const { test, checkedList, points } = route.params;
  
  useEffect(() => {
    navigation.setOptions({
      title: "Formulario",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate(test)}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [test]);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Crear Paciente con la data
      const apiPaciente = await crearPaciente(data);

      // Crear respuestas del tutot con checked list
      const apiRespuestasTutor = await crearRespuestasTutor[test](checkedList);

      // Crear lista con los id de las respuestas
      const apiRespuestasTutorId = apiRespuestasTutor.data.map(
        (respuesta) => respuesta.id
      );

      // get id DatosPersonales
      const idDatosPersonales =
        apiPaciente.status === 200
          ? apiPaciente.data.data.id
          : apiPaciente.data.id;

      // get respuestas del test
      const respuestas =
        test === "MChatR" ? apiRespuestasTutor.data : apiRespuestasTutorId;

      // Formato de envio de la respuesta:
      const formatoRespuetasTest = {
        evaluador: 2,
        puntuacion: points,
        respuestas: respuestas,
        datos_personales: idDatosPersonales,
      };

      // Crear respuesta Final
      const apiRespuestasTest = await crearRespuestas[test](
        formatoRespuetasTest
      );

      console.log("respuesta de guardado, resultado final", apiRespuestasTest);

      ToastAndroid.show("Respuesta Enviada", ToastAndroid.SHORT);

      navigation.reset({ index: 0, routes: [{ name: "Inicio" }] });
    } catch (e) {
      console.log(e);
      ToastAndroid.show("Error al enviar la respuesta", ToastAndroid.SHORT);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.targetContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginVertical: 20,
              color: constant.primaryColor,
            }}
          >
            Envío de Resultados
          </Text>
          <AntDesign name="form" size={24} color={constant.primaryColor} />
        </View>
        <View style={styles.formGroup}></View>

        <View style={styles.formGroup}>
          <Text style={styles.subTitle}>Nombre Paciente</Text>
          <Controller
            control={control}
            name="nombre_paciente"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.inputStyles}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.nombre_paciente && (
            <Text style={{ fontStyle: "italic", fontSize: 12 }}>
              El nombre es requerido
            </Text>
          )}
        </View>

        <View style={[styles.formGroupRow, { marginBottom: 15 }]}>
          <Text style={styles.subTitle}>Edad del Paciente</Text>
          <Controller
            control={control}
            name="edad_paciente_meses"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.inputStyles}
                keyboardType="numeric"
                placeholder="30"
                maxLength={2}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Text style={styles.subTitle}>Meses</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.subTitle}>Nombre Entrevistado</Text>
          <Controller
            rules={{
              required: true,
            }}
            control={control}
            name="nombre_tutor"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.inputStyles}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.nombre_paciente && (
            <Text style={{ fontStyle: "italic", fontSize: 12 }}>
              El nombre del entrevistado es requerido
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.buttonStyles}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", marginTop: 30 },
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
    paddingHorizontal: 20,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  subTitle: { marginBottom: 5 },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  formGroup: {
    marginBottom: 15,
  },
  formGroupRow: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyles: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 4,
  },
  buttonStyles: {
    alignItems: "center",
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    marginVertical: 30,
    marginHorizontal:20
  },
});

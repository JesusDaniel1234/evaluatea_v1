import React, { useEffect, useState } from "react";
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
import {
  crearRespuestas,
  crearRespuestasTutor,
} from "../utils/GestionRespuestasTest";
import { formCommonStyles } from "../constants/formCommonStyles";
import TargetCustomContainer from "./TargetCustomContainer.jsx";
import { useLoadLocalBDdata } from "../hooks/LoadPatientsDb.jsx";
import { Dropdown } from "react-native-element-dropdown";

export default function ModalFormTest({ navigation, route }) {
  const { test, checkedList, points } = route.params;
  const { patients, loading } = useLoadLocalBDdata();
  console.log("Esta es la lista de respuestas: ",checkedList)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Crear Paciente con la data
      const apiPaciente = await crearPaciente(data);
      console.log("Paciente-Creadas:");
      // Crear respuestas del tutot con checked list
      const apiRespuestasTutor = await crearRespuestasTutor[test](checkedList);

      console.log("RepuestasTutor-Creadas:")
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
        puntuacion: points,
        respuestas: respuestas,
        datos_personales: idDatosPersonales,
      };

      console.log(formatoRespuetasTest)

      // Crear respuesta Final
      const apiRespuestasTest = await crearRespuestas[test](
        formatoRespuetasTest
      );
      console.log("Repuestas-Creadas:");

      console.log("respuesta de guardado, resultado final", apiRespuestasTest);

      ToastAndroid.show("Respuesta Enviada", ToastAndroid.SHORT);

      navigation.reset({ index: 0, routes: [{ name: "Inicio" }] });
    } catch (e) {
      console.log(e);
      ToastAndroid.show("Error al enviar la respuesta", ToastAndroid.SHORT);
    }
  };

  const handleDropdown = (patient) => {
    setValue("tarjeta_menor", patient.CI);
    setValue("nombre_paciente", patient.patient);
    setValue("nombre_tutor", patient.mentor);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TargetCustomContainer>
        <View style={formCommonStyles.header}>
          <Text style={formCommonStyles.titleHeader}>Envío de Resultados</Text>
          <AntDesign name="form" size={30} color={constant.primaryColor} />
        </View>
        <View style={formCommonStyles.formGroup}>
          <Text style={formCommonStyles.subTitle}>Selecciona un Paciente</Text>
          <Dropdown
            style={formCommonStyles.inputStyles}
            placeholderStyle={{
              fontSize: 15,
              color: "gray",
            }}
            itemContainerStyle={{
              borderRadius: 4,
            }}
            containerStyle={formCommonStyles.formGroup}
            placeholder={
              loading
                ? "Cargando..."
                : patients.length === 0
                ? "No ha creado ningún paciente"
                : "Datos Cargados"
            }
            disable={patients.length === 0}
            searchPlaceholder="Buscar..."
            search
            data={patients}
            valueField={"id"}
            labelField={"patient"}
            onChange={handleDropdown}
          />
        </View>

        <View style={formCommonStyles.formGroup}>
          <Text style={formCommonStyles.subTitle}>Targeta de Menor</Text>
          <Controller
            control={control}
            name="tarjeta_menor"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={formCommonStyles.inputStyles}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.tarjeta_menor && (
            <View style={formCommonStyles.errorContainer}>
              <AntDesign name="warning" size={12} color="black" />
              <Text style={formCommonStyles.errorText}>
                Falta la Targeta de Menor del Paciente
              </Text>
            </View>
          )}
        </View>
        <View style={formCommonStyles.formGroup}>
          <Text style={formCommonStyles.subTitle}>Nombre Paciente</Text>
          <Controller
            control={control}
            name="nombre_paciente"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={formCommonStyles.inputStyles}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.nombre_paciente && (
            <View style={formCommonStyles.errorContainer}>
              <AntDesign name="warning" size={12} color="black" />
              <Text style={formCommonStyles.errorText}>
                Falta el Nombre del Paciente
              </Text>
            </View>
          )}
        </View>
        <View style={formCommonStyles.formGroup}>
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
          {errors.edad_paciente_meses && (
            <View style={formCommonStyles.errorContainer}>
              <AntDesign name="warning" size={12} color="black" />
              <Text style={formCommonStyles.errorText}>
                Falta la edad del Paciente en meses
              </Text>
            </View>
          )}
        </View>

        <View style={formCommonStyles.formGroup}>
          <Text style={formCommonStyles.subTitle}>Nombre Tutor</Text>
          <Controller
            rules={{
              required: true,
            }}
            control={control}
            name="nombre_tutor"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={formCommonStyles.inputStyles}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.nombre_paciente && (
            <View style={formCommonStyles.errorContainer}>
              <AntDesign name="warning" size={12} color="black" />
              <Text style={formCommonStyles.errorText}>
                Falta el nombre del Tutor
              </Text>
            </View>
          )}
        </View>
        <View style={formCommonStyles.buttonContainer}>
          <TouchableOpacity
            style={formCommonStyles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={formCommonStyles.buttonTextCancel}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={formCommonStyles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={formCommonStyles.buttonTextSubmit}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </TargetCustomContainer>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  
  subTitle: { fontSize: 15, marginLeft: 5 },
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
    marginHorizontal: 20,
  },
});

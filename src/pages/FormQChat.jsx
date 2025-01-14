import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastAndroid, Alert } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Checkbox } from "react-native-paper";
import { UserContext } from "../context/UserProvider";
import {
  actualizarPreguntasQChat,
  crearPreguntasQChat,
  eliminarPreguntasQChat,
} from "../api/axios.qchat";

import { Dropdown } from "react-native-element-dropdown";
import { useFormLogicTest } from "../hooks/FormLogicTests";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent";
import { formCommonStyles } from "../constants/formCommonStyles";
import TargetCustomContainer from "../components/TargetCustomContainer";

function FromQChat({ navigation, route }) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const params = route.params || {};
  const { userData } = useContext(UserContext);

  const { loading, targetValue, tipoRiesgo, rangoRiesgo, setTargetValue } =
    useFormLogicTest({
      setValue,
      id: params.id,
      token: params.token,
      test: params.test,
    });

  const nuevosRangoRiesgos = rangoRiesgo.filter(
    (valor) => String(valor.tipo_riesgo.id) === String(targetValue)
  );

  const onSubmit = async (data) => {
    data["tipo_riesgo"] = targetValue;
    if (
      data["tipo_riesgo"] === undefined ||
      data["rango_riesgo"] === undefined
    ) {
      Alert.alert("Corregir Opciones de Selección");
      return;
    }
    data["creado_por"] = userData.id;
    if (params.id) {
      console.log(data, params.id);
      await actualizarPreguntasQChat(params.id, data, params.token);
      ToastAndroid.show("Pregunta Actualizada", ToastAndroid.SHORT);
    } else {
      data["activa"] = data["activa"] === "checked" ? true : false;
      await crearPreguntasQChat(data, params.token);
      ToastAndroid.show("Pregunta Creada", ToastAndroid.SHORT);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "ListarPreguntas", params: { test: "QChat" } }],
    });
  };

  const handleDelete = async () => {
    Alert.alert("Confirmación", "¿Estás Seguro?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: async () => {
          const response = await eliminarPreguntasQChat(
            params.id,
            params.token
          );

          ToastAndroid.show("Pregunta Eliminada", ToastAndroid.SHORT);
          navigation.reset({
            index: 0,
            routes: [{ name: "ListarPreguntas", params: { test: "QChat" } }],
          });
        },
        style: "destructive",
      },
    ]);
  };

  if (loading) return <LoadingSpinnerComponent />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TargetCustomContainer>
        <View style={formCommonStyles.header}>
          <Text style={formCommonStyles.titleHeader}>Crear Pregunta</Text>
          {params.id && (
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.deleteButton}
            >
              <FontAwesome name="trash-o" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.form}>
          <View style={formCommonStyles.formGroup}>
            <Text style={formCommonStyles.subTitle}>Contenido</Text>
            <Controller
              control={control}
              name="contenido"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={formCommonStyles.inputStyles}
                  multiline
                  numberOfLines={5}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
            />

            {errors.contenido && (
              <View style={formCommonStyles.errorContainer}>
                <AntDesign name="warning" size={12} color="black" />
                <Text style={formCommonStyles.errorText}>
                  Falta el contenido de la Pregunta
                </Text>
              </View>
            )}
          </View>

          <View style={formCommonStyles.formGroup}>
            <Text style={formCommonStyles.subTitle}>Tipo de Riesgo</Text>
            <Controller
              control={control}
              name="tipo_riesgo"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
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
                  value={value}
                  placeholder={"Seleccione el tipo de Riesgo"}
                  data={tipoRiesgo}
                  valueField={"id"}
                  labelField={"nombre"}
                  onChange={(val) => {
                    onChange(val.id),
                      setTargetValue(val.id),
                      setValue("rango_riesgo", undefined);
                  }}
                />
              )}
            />
            {errors.tipo_riesgo && (
              <View style={formCommonStyles.errorContainer}>
                <AntDesign name="warning" size={12} color="black" />
                <Text style={formCommonStyles.errorText}>
                  No ha selecionado el tipo de riesgo
                </Text>
              </View>
            )}
          </View>

          <View style={formCommonStyles.formGroup}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={[styles.label, { flex: 0.3 }]}>Mientras</Text>
              <Controller
                control={control}
                name="rango_riesgo"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Dropdown
                    style={[
                      formCommonStyles.inputStyles,
                      {
                        flex: 0.7,
                      },
                    ]}
                    placeholderStyle={{
                      fontSize: 16,
                    }}
                    containerStyle={{ borderRadius: 4 }}
                    value={value}
                    placeholder={"Seleccione el Rango"}
                    data={nuevosRangoRiesgos}
                    valueField={"id"}
                    labelField={"rango"}
                    onChange={(val) => onChange(val.id)}
                  />
                )}
              />
            </View>
            <Text style={styles.label}>es más riesgoso.</Text>
            {errors.rango_riesgo && (
              <View style={formCommonStyles.errorContainer}>
                <AntDesign name="warning" size={12} color="black" />
                <Text style={formCommonStyles.errorText}>
                  No ha selecionado el rango de riesgo
                </Text>
              </View>
            )}
          </View>

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Activa</Text>
            <Controller
              control={control}
              name="activa"
              defaultValue={"checked"}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  status={value ? "checked" : "unchecked"}
                  onPress={() => onChange(!value)}
                />
              )}
            />
          </View>

          <View style={formCommonStyles.buttonContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [
                    { name: "ListarPreguntas", params: { test: "QChat" } },
                  ],
                })
              }
              style={formCommonStyles.cancelButton}
            >
              <Text style={formCommonStyles.buttonTextCancel}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={formCommonStyles.submitButton}
            >
              <Text style={formCommonStyles.buttonTextSubmit}>
                {params.id ? "Actualizar" : "Crear"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TargetCustomContainer>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  targetConatiner: {
    padding: 25,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  deleteButton: {
    padding: 8,
    backgroundColor: "#d9534f",
    borderRadius: 4,
  },
  form: {
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    textAlignVertical: "top",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#fff",
  },
  description: {
    fontSize: 14,
    color: "#888",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkboxLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    fontStyle: "italic",
  },
});

export default FromQChat;

import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TargetCustomContainer from "../components/TargetCustomContainer";
import { constant } from "../constants/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { formCommonStyles } from "../constants/formCommonStyles";



export default function FormCreatePatient({ navigation, route }) {
  const params = route.params || {};

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (params.patient) {
      setValue("CI", params.patient.CI);
      setValue("patient", params.patient.patient);
      setValue("mentor", params.patient.mentor);
    }
  }, [params.patient]);

  const db = useSQLiteContext();

  const onSubmit = async (data) => {
    if (data["CI"].length !== 11) {
      Alert.alert("El CI debe ser de 11 caracteres");
      return;
    }

    try {
      if (!params.patient) {
        await db.runAsync(
          "INSERT INTO patient (CI, patient, mentor) VALUES (?, ?, ?)",
          data["CI"],
          data["patient"],
          data["mentor"]
        );
        navigation.reset({
          index: 0,
          routes: [{ name: "Pacientes" }],
        });
      } else {
        await db.runAsync(
          `UPDATE patient SET CI=?, patient=?, mentor=? WHERE id=?`,
          data["CI"],
          data["patient"],
          data["mentor"],
          params.patient.id
        );
        navigation.reset({
          index: 0,
          routes: [{ name: "Pacientes" }],
        });
      }
    } catch (e) {
      console.error("Ha ocurridr un error: ", e);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TargetCustomContainer>
        <View style={formCommonStyles.header}>
          <Text style={formCommonStyles.titleHeader}>
            {params.patient ? "Actualizar" : "Crear"} Paciente
          </Text>
          <AntDesign name="form" size={30} color={constant.primaryColor} />
        </View>

        <View style={formCommonStyles.formGroup}>
          <Text style={formCommonStyles.subTitle}>Targeta de Menor</Text>
          <Controller
            control={control}
            name="CI"
            rules={{ required: true, maxLength: 11, minLength: 11 }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={formCommonStyles.inputStyles}
                value={value}
                onChangeText={(val) => onChange(val)}
              />
            )}
          />
          {errors.CI && (
            <View style={formCommonStyles.errorContainer}>
              <AntDesign name="warning" size={12} color="black" />
              <Text style={formCommonStyles.errorText}>
                {errors.CI.type === "required"
                  ? "Escriba la Tarjeta de Menor"
                  : "El número debe ser de 11 dígitos"}
              </Text>
            </View>
          )}
        </View>

        <View style={formCommonStyles.formGroup}>
          <Text style={formCommonStyles.subTitle}>Paciente</Text>
          <Controller
            control={control}
            name="patient"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={formCommonStyles.inputStyles}
                value={value}
                onChangeText={(val) => onChange(val)}
              />
            )}
          />
          {errors.patient && (
            <View style={formCommonStyles.errorContainer}>
              <AntDesign name="warning" size={12} color="black" />
              <Text style={formCommonStyles.errorText}>
                Escriba el Nombre del Paciente
              </Text>
            </View>
          )}
        </View>

        <View style={formCommonStyles.formGroup}>
          <Text style={formCommonStyles.subTitle}>Tutor</Text>
          <Controller
            control={control}
            name="mentor"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={formCommonStyles.inputStyles}
                value={value}
                onChangeText={(val) => onChange(val)}
              />
            )}
          />
          {errors.mentor && (
            <View style={formCommonStyles.errorContainer}>
              <AntDesign name="warning" size={12} color="black" />
              <Text style={formCommonStyles.errorText}>
                Escriba el Nombre de su Tutor
              </Text>
            </View>
          )}
        </View>

        <View style={formCommonStyles.buttonContainer}>
          <TouchableOpacity
            style={formCommonStyles.cancelButton}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Pacientes" }],
              })
            }
          >
            <Text style={formCommonStyles.buttonTextCancel}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={formCommonStyles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={formCommonStyles.buttonTextSubmit}>
              {params.patient ? "Actualizar" : "Crear"}
            </Text>
          </TouchableOpacity>
        </View>
      </TargetCustomContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});



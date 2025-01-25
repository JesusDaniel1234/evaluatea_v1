import React, { useContext, useState } from "react";
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
import {
  actualizarPreguntasMChatR,
  crearPreguntasMChatR,
  eliminarPreguntasMChatR,
} from "../api/axios.mchatr";
import { Checkbox } from "react-native-paper";
import { UserContext } from "../context/UserProvider";
import { Dropdown } from "react-native-element-dropdown";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent";
import { useFormLogicTestMChatR } from "../hooks/FromLogicTestMChatR";
import { formCommonStyles } from "../constants/formCommonStyles";
import TargetCustomContainer from "../components/TargetCustomContainer";
import ModalComponent from "../components/ModalComponent";

function FormMChatR({ navigation, route }) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const params = route.params || {};

  const { userData } = useContext(UserContext);

  const [modalLoading, setModalLoading] = useState(false)

  const { loading } = useFormLogicTestMChatR({
    id: params.id,
    token: params.token,
    setValue,
  });

  const onSubmit = async (data) => {
    setModalLoading(true)
    data["creado_por"] = userData.id;
    try {
      if (params.id) {
        await actualizarPreguntasMChatR(params.id, data, params.token);
        ToastAndroid.show("Pregunta Actualizada", ToastAndroid.SHORT);
      } else {
        data["activa"] = data["activa"] === "checked" ? true : false;
        await crearPreguntasMChatR(data, params.token);
        ToastAndroid.show("Pregunta Creada", ToastAndroid.SHORT);
      }
      navigation.reset({
        index: 0,
        routes: [{ name: "ListarPreguntas", params: { test: "MChatR" } }],
      });
    } catch (e) {
      console.log(e);
    } finally {
      setModalLoading(false)
    }
  };

  const pickers = [
    { label: "Si", value: "SI" },
    { label: "No", value: "NO" },
  ];

  const handleDelete = async () => {
    Alert.alert("Confirmación", "¿Estás Seguro?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: async () => {
          await eliminarPreguntasMChatR(params.id, params.token);

          ToastAndroid.show("Pregunta Eliminada", ToastAndroid.SHORT);
          navigation.reset({
            index: 0,
            routes: [{ name: "ListarPreguntas", params: { test: "MChatR" } }],
          });
        },
        style: "destructive",
      },
    ]);
  };

  if (loading) return <LoadingSpinnerComponent />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <ModalComponent loading={modalLoading} />
      <TargetCustomContainer>
        <View style={formCommonStyles.header}>
          <Text style={formCommonStyles.titleHeader}>Crear Pregunta</Text>
          {params.id && (
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.deleteButton}
            >
              <FontAwesome name="trash-o" size={24} color="black" />
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
                  Falta el contenido de Pregunta
                </Text>
              </View>
            )}
          </View>

          <View>
            <Text style={formCommonStyles.subTitle}>Respuesta de Riesgo</Text>
            <Controller
              control={control}
              name="respuesta_riesgo"
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
                  containerStyle={formCommonStyles.form}
                  value={value}
                  placeholder={"Seleccione el Valor de Riesgo"}
                  data={pickers}
                  valueField={"value"}
                  labelField={"label"}
                  onChange={(val) => onChange(val.value)}
                />
              )}
            />
            {errors.respuesta_riesgo && (
              <View style={formCommonStyles.errorContainer}>
                <AntDesign name="warning" size={12} color="black" />
                <Text style={formCommonStyles.errorText}>
                  No ha selecionado el Valor de Riesgo
                </Text>
              </View>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.description}>
              Establece el valor que se tomará en cuenta para definir el riesgo
            </Text>
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
                navigation.navigate("ListarPreguntas", { test: "MChatR" })
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

  deleteButton: {
    padding: 8,
    backgroundColor: "#d9534f",
    borderRadius: 4,
  },
  form: {
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
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
});

export default FormMChatR;

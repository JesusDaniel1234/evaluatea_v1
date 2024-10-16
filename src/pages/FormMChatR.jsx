import React, { useContext, useEffect } from "react";
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
  detallarPreguntasMChatR,
  eliminarPreguntasMChatR,
} from "../api/axios.mchatr";
import { Checkbox } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { UserContext } from "../context/UserProvider";

function FormMChatR({ navigation, route }) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const params = route.params || {};

  const { userData } = useContext(UserContext);

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await detallarPreguntasMChatR(params.id, params.token);
        setValue("contenido", res.data.contenido);
        setValue("respuesta_riesgo", res.data.respuesta_riesgo);
        setValue("activa", res.data.activa);
      }
    }
    loadTask();
  }, [params.id]);

  const onSubmit = async (data) => {
    data["creado_por"] = userData.id;
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
      routes: [{ name: "Listar M-Chat-R" }],
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
          const response = await eliminarPreguntasMChatR(
            params.id,
            params.token
          );

          ToastAndroid.show("Pregunta Eliminada", ToastAndroid.SHORT);
          navigation.reset({
            index: 0,
            routes: [{ name: "Listar M-Chat-R" }],
          });
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.targetConatiner}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Listar M-Chat-R")}
            style={styles.backButton}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Crear Pregunta</Text>
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
          <View style={styles.formGroup}>
            <Text style={styles.label}>Contenido</Text>
            <Controller
              control={control}
              name="contenido"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.textArea}
                  multiline
                  numberOfLines={5}
                  value={value}
                  onChangeText={(value) => onChange(value)}
                />
              )}
            />

            {errors.contenido && (
              <Text style={styles.errorText}>
                <AntDesign name="warning" size={24} color="black" />
                Falta el contenido de Pregunta
              </Text>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#ccc",
              borderRadius: 10,
              paddingHorizontal: 10,
              width: "75%",
            }}
          >
            <Text style={[{ flex: 1 }, styles.label]}>Valor de Riesgo:</Text>
            <Controller
              control={control}
              name="respuesta_riesgo"
              defaultValue={"SI"}
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(value) => onChange(value)}
                  style={{
                    flex: 1,
                  }}
                >
                  <Picker.Item label="Si" value="SI" />
                  <Picker.Item label="No" value="NO" />
                </Picker>
              )}
            />
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

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={styles.submitButton}
            >
              <Text style={styles.buttonText}>
                {params.id ? "Actualizar" : "Crear"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
  },
  targetConatiner: {
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
  backButton: {
    padding: 8,
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
    marginTop: 4,
  },
});

export default FormMChatR;

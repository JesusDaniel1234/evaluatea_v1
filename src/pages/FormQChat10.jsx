import { useContext } from "react";
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
import { Dropdown } from "react-native-element-dropdown";
import {
  actualizarPreguntasQChat10,
  crearPreguntasQChat10,
  eliminarPreguntasQChat10,
} from "../api/axios.qchat10";
import { useFormLogicTest } from "../hooks/FormLogicTests";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent";

function FromQChat10({ navigation, route }) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const params = route.params || {};
  const { userData } = useContext(UserContext);
  const { loading, tipoRiesgo, rangoRiesgo, valorRiesgo, targetValue, setTargetValue } =
    useFormLogicTest({
      setValue,
      id: params.id,
      token: params.token,
      test: params.test,
    });

  console.log(params.test);
  const nuevosRangoRiesgos = rangoRiesgo.filter(
    (valor) => String(valor.tipo_riesgo.id) === String(targetValue)
  );

  const nuevosValores = valorRiesgo.filter(
    (valor) => String(valor.tipo_riesgo.id) === String(targetValue)
  );

  const onSubmit = async (data) => {
    console.log(data);
    data["tipo_riesgo"] = targetValue;

    const validForm = [
      data["tipo_riesgo"],
      data["valor_riesgo"],
      data["rango_riesgo"],
    ].some((value) => value === undefined);

    if (validForm) {
      Alert.alert("Formulario Incompleto");
      return;
    }
    data["creado_por"] = userData.id;
    if (params.id) {
      console.log(data, params.id);
      await actualizarPreguntasQChat10(params.id, data, params.token);
      ToastAndroid.show("Pregunta Actualizada", ToastAndroid.SHORT);
    } else {
      data["activa"] = data["activa"] === "checked" ? true : false;
      await crearPreguntasQChat10(data, params.token);
      ToastAndroid.show("Pregunta Creada", ToastAndroid.SHORT);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: "ListarPreguntas", params: { test: "QChat10" } }],
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
          try {
            const response = await eliminarPreguntasQChat10(
              params.id,
              params.token
            );

            ToastAndroid.show("Pregunta Eliminada", ToastAndroid.SHORT);
            navigation.reset({
              index: 0,
              routes: [
                { name: "ListarPreguntas", params: { test: "QChat10" } },
              ],
            });
          } catch (e) {
            console.log(e);

            ToastAndroid.show(
              "Hubo un error al eliminar la pregunta.",
              ToastAndroid.SHORT
            );
          }
        },
        style: "destructive",
      },
    ]);
  };
  
  if (loading) return <LoadingSpinnerComponent />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.targetConatiner}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  { name: "ListarPreguntas", params: { test: "QChat10" } },
                ],
              })
            }
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
              rules={{ required: true }}
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 2,
                }}
              >
                <AntDesign name="warning" size={12} color="black" />
                <Text style={styles.errorText}>
                  Falta el contenido de la Pregunta
                </Text>
              </View>
            )}
          </View>

          <View style={{ marginVertical: 10 }}>
            <Controller
              control={control}
              name="tipo_riesgo"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Dropdown
                  style={{
                    padding: 10,
                    backgroundColor: "#D3D3D3",
                    borderRadius: 4,
                  }}
                  placeholderStyle={{
                    fontSize: 16,
                  }}
                  itemContainerStyle={{
                    borderRadius: 4,
                  }}
                  containerStyle={{ borderRadius: 20 }}
                  value={value}
                  placeholder={"Seleccione el Tipo de Riesgo"}
                  data={tipoRiesgo}
                  valueField={"id"}
                  labelField={"nombre"}
                  onChange={(val) => {
                    onChange(val.id),
                      setTargetValue(val.id),
                      setValue("valor_riesgo", undefined),
                      setValue("rango_riesgo", undefined);
                  }}
                />
              )}
            />
            {errors.tipo_riesgo && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 2,
                }}
              >
                <AntDesign name="warning" size={12} color="black" />
                <Text style={styles.errorText}>
                  No ha selecionado el tipo de riesgo
                </Text>
              </View>
            )}
          </View>

          <View style={{ marginVertical: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={[styles.label, { flex: 0.3 }]}>A partir de</Text>
              <Controller
                control={control}
                name="valor_riesgo"
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <Dropdown
                    style={{
                      padding: 10,
                      backgroundColor: "#D3D3D3",
                      borderRadius: 4,
                      flex: 0.7,
                    }}
                    placeholderStyle={{
                      fontSize: 16,
                    }}
                    containerStyle={{ borderRadius: 4 }}
                    value={value}
                    placeholder={"Seleccione el Valor"}
                    data={nuevosValores}
                    valueField={"id"}
                    labelField={"valor"}
                    onChange={(val) => onChange(val.id)}
                  />
                )}
              />
            </View>
            <Text style={styles.label}>se toma como riesgo.</Text>
            {errors.valor_riesgo && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 2,
                }}
              >
                <AntDesign name="warning" size={12} color="black" />
                <Text style={styles.errorText}>No ha selecionado el Valor</Text>
              </View>
            )}
          </View>

          <View style={{ marginVertical: 10 }}>
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
                    style={{
                      padding: 10,
                      backgroundColor: "#D3D3D3",
                      borderRadius: 4,
                      flex: 0.7,
                    }}
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
            {errors.valor_riesgo && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  marginTop: 2,
                }}
              >
                <AntDesign name="warning" size={12} color="black" />
                <Text style={styles.errorText}>No ha selecionado el Rango</Text>
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
    paddingTop: 16,
    alignItems: "center",
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

export default FromQChat10;

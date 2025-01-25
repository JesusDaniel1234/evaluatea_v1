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
import { formCommonStyles } from "../constants/formCommonStyles";
import TargetCustomContainer from "../components/TargetCustomContainer";
import ModalComponent from "../components/ModalComponent";

function FromQChat10({ navigation, route }) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const params = route.params || {};
  const { userData } = useContext(UserContext);
  const {
    loading,
    tipoRiesgo,
    rangoRiesgo,
    valorRiesgo,
    targetValue,
    setTargetValue,
  } = useFormLogicTest({
    setValue,
    id: params.id,
    token: params.token,
    test: params.test,
  });

  const [modalLoading, setModalLoading] = useState(false);

  const nuevosRangoRiesgos = rangoRiesgo.filter(
    (valor) => String(valor.tipo_riesgo.id) === String(targetValue)
  );

  const nuevosValores = valorRiesgo.filter(
    (valor) => String(valor.tipo_riesgo.id) === String(targetValue)
  );

  const onSubmit = async (data) => {
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
    setModalLoading(true);
    try {
      if (params.id) {
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
    } catch (e) {
      ToastAndroid.show("Ha ocurrido un error.", ToastAndroid.SHORT);
    } finally {
      setModalLoading(false);
    }
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
          setModalLoading(true);
          try {
            await eliminarPreguntasQChat10(params.id, params.token);
            ToastAndroid.show("Pregunta Eliminada", ToastAndroid.SHORT);
            navigation.reset({
              index: 0,
              routes: [
                { name: "ListarPreguntas", params: { test: "QChat10" } },
              ],
            });
          } catch (e) {
            ToastAndroid.show("Ha orurrido un error.", ToastAndroid.SHORT);
          } finally {
            setModalLoading(false);
          }
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

          <View style={formCommonStyles.formGroup}>
            <Text style={formCommonStyles.subTitle}>Tipo de Riesgo</Text>
            <Controller
              control={control}
              name="tipo_riesgo"
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
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
              <Text style={[styles.label, { flex: 0.3 }]}>A partir de</Text>
              <Controller
                control={control}
                name="valor_riesgo"
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
              <View style={formCommonStyles.errorContainer}>
                <AntDesign name="warning" size={12} color="black" />
                <Text style={formCommonStyles.errorText}>
                  No ha selecionado el Valor
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
            {errors.valor_riesgo && (
              <View style={formCommonStyles.errorContainer}>
                <AntDesign name="warning" size={12} color="black" />
                <Text style={formCommonStyles.errorText}>
                  No ha selecionado el Rango
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
                    { name: "ListarPreguntas", params: { test: "QChat10" } },
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

  deleteButton: {
    padding: 8,
    backgroundColor: "#d9534f",
    borderRadius: 4,
  },
  form: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
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

export default FromQChat10;

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserProvider";

function FromProfile({ navigation, route }) {
  const { onSubmit } = useContext(UserContext);

  const { imagen_perfil, usuario } = route.params.userData;
  const { email, first_name, last_name, username } = usuario;
  const { setValue, handleSubmit, control } = useForm();

  useEffect(() => {
    setValue("username", username);
    setValue("first_name", first_name);
    setValue("last_name", last_name);
    setValue("email", email);
  });

  const handleOnSubmit = async (data) => {
    try {
      await onSubmit(data);
      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack(); // Navigate back after success
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.targetContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <Image
            source={{ uri: imagen_perfil }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "transparent",
            }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              Actualizar Perfil
            </Text>
            <Text style={{ marginTop: 5, fontSize: 16 }}>
              Username: {username}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.subTitle}>Nombre Usuario</Text>
          <Controller
            name="username"
            control={control}
            defaultValue={username}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.inputStyles}
                value={value}
                placeholder="Username"
                onChangeText={(value) => onChange(value)}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.subTitle}>Nombre</Text>
          <Controller
            name="first_name"
            control={control}
            defaultValue={first_name}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.inputStyles}
                placeholder="Nombre"
                value={value}
                onChangeText={(value) => onChange(value)}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.subTitle}>Apellidos</Text>
          <Controller
            name="last_name"
            control={control}
            defaultValue={last_name}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.inputStyles}
                placeholder="Apellidos"
                value={value}
                onChangeText={(value) => onChange(value)}
              />
            )}
          />
        </View>

        <View>
          <Text style={styles.subTitle}>Correo Electrónico</Text>
          <Controller
            name="email"
            control={control}
            defaultValue={email}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.inputStyles}
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                value={value}
                onChangeText={(value) => onChange(value)}
              />
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.buttonStyles}
          onPress={handleSubmit(handleOnSubmit)}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default FromProfile;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
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
  inputStyles: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  buttonStyles: {
    alignItems: "center",
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    marginVertical: 30,
  },
});

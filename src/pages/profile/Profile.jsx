import { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { UserContext } from "../../context/UserProvider";
import AntDesign from "@expo/vector-icons/AntDesign";
import TargetCustomContainer from "../../components/TargetCustomContainer";
const Profile = ({ navigation }) => {
  const { userData, userToken } = useContext(UserContext);
  const { usuario } = userData;
  const { email, first_name, last_name, username } = usuario;
  const name = first_name + " " + last_name;

  const toFormPerfil = () =>
    navigation.navigate("FormProfile", {
      userData: userData,
      token: userToken,
    });
  return (
    <ScrollView contentContainerStyle={styles.containerStyle}>
      <TargetCustomContainer>
        <View style={styles.imageContainer}>
          {/* {imagen_perfil && (
            <Image source={{ uri: imagen_perfil }} style={styles.imageStyle} />
          )} */}
          <View style={styles.infoStyle}>
            <Text style={styles.titleStyle}>Perfil de Usuario</Text>
            <Text style={styles.usernameStyle}>Username: {username}</Text>
          </View>
        </View>
        <View style={styles.lineaSpacing} />
        <View style={styles.labelContainer}>
          <AntDesign name="user" size={24} color="black" />
          {name ? (
            <Text style={styles.textStyles}>{name}</Text>
          ) : (
            <Text style={styles.textStyles}>**************</Text>
          )}
        </View>
        <View style={styles.labelContainer}>
          <AntDesign name="mail" size={24} color="black" />
          {email ? (
            <Text style={styles.textStyles}>{email}</Text>
          ) : (
            <Text style={styles.textStyles}>**************</Text>
          )}
        </View>

        <TouchableOpacity onPress={toFormPerfil} style={styles.touchableStyles}>
          <Text style={styles.textButton}>Actualizar</Text>
        </TouchableOpacity>
      </TargetCustomContainer>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  targetStyle: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "95%",
    marginTop: 40,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: 20,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "transparent",
  },
  infoStyle: { marginLeft: 10 },
  titleStyle: { fontSize: 24, fontWeight: "bold" },
  usernameStyle: { marginTop: 5, fontSize: 16 },
  lineaSpacing: {
    marginVertical: 15,
    width: "90%",
    height: 2,
    backgroundColor: "black",
    alignSelf: "center",
  },
  labelContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textStyles: { fontSize: 15, fontWeight: "500" },
  touchableStyles: {
    alignItems: "center",
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    marginVertical: 30,
  },

  textButton: { color: "white", fontSize: 20 },
});

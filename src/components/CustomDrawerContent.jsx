import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListLabelsMenu } from "../NavigationItems";
import { useContext } from "react";
import { constant } from "../constants/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { UserContext } from "../context/UserProvider";
import UserInfoDrawerComponent from "./UserInfoDrawerComponent";
import TouchableMenuComponent from "./TouchableMenuComponent";

export function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const { signOut, userToken } = useContext(UserContext);

  function authFuction() {
    if (!userToken) {
      navigation.navigate("Login");
      return;
    }
    signOut();
    Alert.alert("Sesión cerrada con éxito");
    navigation.reset({
      index: 0,
      routes: [{ name: "Inicio" }],
    });
  }

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <View>
        <UserInfoDrawerComponent
          navigation={navigation}
          userToken={userToken}
        />

        <View style={styles.lineaSpacing} />
        <DrawerItemList {...props} />
        <View style={styles.lineaSpacing} />

        <TouchableMenuComponent
          ListLabelsMenu={ListLabelsMenu}
          userToken={userToken}
          navigation={navigation}
        />
      </View>

      <TouchableOpacity style={styles.touchableAuth} onPress={authFuction}>
        <View style={styles.touchableAuthContent}>
          <MaterialCommunityIcons
            name={userToken ? "logout" : "login"}
            size={24}
            color="black"
          />
          <Text style={styles.touchableAuthText}>
            {userToken ? "Cerrar Sesión" : "Iniciar Sesión"}
          </Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    justifyContent: "space-between",
  },
  lineaSpacing: {
    marginVertical: 15,
    width: "90%",
    height: 1,
    backgroundColor: "black",
    alignSelf: "center",
  },
  touchableAuth: {
    marginHorizontal: constant.SPACING / 1.7,
    marginVertical: constant.SPACING / 2.5,
    borderColor: "black",
    borderTopWidth: 1,
  },
  touchableAuthContent: {
    flexDirection: "row",
    paddingHorizontal: constant.SPACING,
    paddingVertical: 17,
    gap: 30,
  },
  touchableAuthText: {
    paddingRight: 10,
    fontSize: constant.textFontSize,
    paddingHorizontal: constant.SPACING,
    fontWeight: "500",
  },
});

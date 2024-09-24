import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import {
  Alert,
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { ListLabelsMenu } from "../NavigationItems";
import { useContext, useEffect, useState } from "react";
import { constant } from "../constants/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { UserContext } from "../context/UserProvider";
import UserInfoDrawerComponent from "./UserInfoDrawerComponent";

export function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const [currentRoute, setCurrentRoute] = useState("Inicio");
  const navigationState = useNavigationState((state) => state);
  const [menuIndex, setMenuIndex] = useState(-1);
  const listaPagesPrincipal = ["Inicio", "Profile"];
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

  useEffect(() => {
    if (navigationState) {
      const routeName = navigationState.routes[navigationState.index]?.name;
      setCurrentRoute(routeName);
      if (listaPagesPrincipal.find((elememt) => routeName === elememt)) {
        setMenuIndex(-1);
      }
    }
  }, [navigationState]);
  console.log(currentRoute);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setMenuIndex(menuIndex === index ? -1 : index);
  };

  const image = require("../../assets/autism_image.jpg");

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

        {ListLabelsMenu.map((item, index) => {
          if (!item.needAuth === Boolean(userToken)) return;

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              style={styles.secondMenuStyles}
              onPress={() => toggleExpand(index)}
            >
              <View style={styles.secondMenuContainer}>
                <View style={styles.secondMenuDisposition}>
                  {item.icon}
                  <Text style={styles.secondMenuLabel}>{item.name}</Text>
                </View>

                <AntDesign
                  name={menuIndex === index ? "down" : "up"}
                  size={24}
                  color="black"
                />
              </View>
              {menuIndex === index && (
                <View style={styles.submenuContainer}>
                  {item.subMenu.map((menu, index) => {
                    return (
                      <TouchableNativeFeedback
                        key={index}
                        onPress={() => navigation.navigate(menu.name)}
                      >
                        <View style={styles.submenuContentStyle}>
                          <Text style={{ fontWeight: "500" }}>{menu.name}</Text>
                          {currentRoute === menu.name && (
                            <FontAwesome
                              name="circle"
                              size={10}
                              color="black"
                            />
                          )}
                        </View>
                      </TouchableNativeFeedback>
                    );
                  })}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
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
  secondMenuStyles: {
    marginHorizontal: constant.SPACING / 1.7,
    marginVertical: constant.SPACING / 2.5,
    borderRadius: constant.borderRadius,
  },
  secondMenuContainer: {
    flexDirection: "row",
    paddingHorizontal: constant.SPACING / 1.8,
    paddingVertical: constant.SPACING / 1.2,
    borderRadius: constant.borderRadius,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e68a00",
  },
  secondMenuDisposition: {
    flexDirection: "row",
    alignItems: "center",
    gap: 32,
  },
  secondMenuLabel: {
    paddingRight: 10,
    fontSize: constant.textFontSize,
    paddingHorizontal: constant.SPACING,
    fontWeight: "500",
  },
  submenuContainer: {
    borderRadius: constant.borderRadius,
    backgroundColor: "#e68a00",
    marginTop: 4,
    marginHorizontal: 4,
    borderRadius: constant.borderRadius,
  },
  submenuContentStyle: {
    paddingHorizontal: constant.SPACING,
    paddingVertical: constant.SPACING / 1.5,
    marginVertical: 4,
    marginHorizontal: 5,
    borderRadius: constant.borderRadius,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

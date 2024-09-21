import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import {
  Image,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { ListLabelsMenu } from "../NavigationItems";
import { useEffect, useState } from "react";
import { constant } from "../constants/constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const [currentRoute, setCurrentRoute] = useState("Inicio");
  const navigationState = useNavigationState((state) => state);
  const [menuIndex, setMenuIndex] = useState(-1);
  const listaPagesPrincipal = ["Inicio", "Profile"];

  useEffect(() => {
    if (navigationState) {
      const routeName = navigationState.routes[navigationState.index]?.name;
      setCurrentRoute(routeName);
      if (listaPagesPrincipal.find((elememt) => routeName === elememt)) {
        setMenuIndex(-1);
        print("Entró")
      }
    }
  }, [navigationState]);
  console.log(currentRoute)

  const login = true;

  

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
    >
      <View>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          <Image
            source={require("../../assets/autism_image.jpg")}
            style={{ height: 80, width: 80, borderRadius: 50 }}
          />
          <View
            style={{ justifyContent: "center", paddingHorizontal: 10, flex: 1 }}
          >
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              Jesús Daniel Sánchez Alarcón
            </Text>
            <Text>Ingeniero de Software</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginVertical: 15,
            width: "90%",
            height: 1,
            backgroundColor: "black",
            alignSelf: "center",
          }}
        />
        <DrawerItemList {...props} />
        <View
          style={{
            marginVertical: 15,
            width: "90%",
            height: 1,
            backgroundColor: "black",
            alignSelf: "center",
          }}
        />
        {/** Test Items */}
        {ListLabelsMenu.map((item, index) => {
          if (login && item.name === "Listar Preguntas") {
            return;
          }

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              style={{
                marginHorizontal: constant.SPACING / 1.7,
                marginVertical: constant.SPACING / 2.5,
                borderRadius: constant.borderRadius,
              }}
              onPress={() => setMenuIndex(menuIndex === index ? -1 : index)}
            >
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: constant.SPACING / 1.8,
                  paddingVertical: constant.SPACING / 1.2,
                  borderRadius: constant.borderRadius,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "#e68a00",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 32,
                  }}
                >
                  {item.icon}

                  <Text
                    style={{
                      paddingRight: 10,
                      fontSize: constant.textFontSize,
                      paddingHorizontal: constant.SPACING,
                      fontWeight: "500",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>

                {menuIndex === index ? (
                  <AntDesign name="down" size={24} color="black" />
                ) : (
                  <AntDesign name="up" size={24} color="black" />
                )}
              </View>
              {menuIndex === index && (
                <View
                  style={{
                    borderRadius: constant.borderRadius,
                    backgroundColor: "#e68a00",
                    marginTop: 4,
                    marginHorizontal: 4,
                    borderRadius: constant.borderRadius,
                  }}
                >
                  {item.subMenu.map((menu, index) => {
                    return (
                      <TouchableNativeFeedback
                        key={index}
                        onPress={() => navigation.navigate(menu.name)}
                      >
                        <View
                          style={{
                            paddingHorizontal: constant.SPACING,
                            paddingVertical: constant.SPACING / 1.5,
                            marginVertical: 4,
                            marginHorizontal: 5,
                            // backgroundColor:
                            //   currentRoute === menu.name
                            //     ? "white"
                            //     : "transparent",
                            borderRadius: constant.borderRadius,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
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
      <TouchableOpacity
        style={{
          marginHorizontal: constant.SPACING / 1.7,
          marginVertical: constant.SPACING / 2.5,
          borderColor: "black",
          borderTopWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: constant.SPACING,
            paddingVertical: 17,
            gap: 30,
          }}
        >
          <MaterialCommunityIcons name="login" size={24} color="black" />
          <Text
            style={{
              paddingRight: 10,
              fontSize: constant.textFontSize,
              paddingHorizontal: constant.SPACING,
              fontWeight: "500",
            }}
          >
            Login
          </Text>
        </View>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

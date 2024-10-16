import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { CustomDrawerContent } from "./CustomDrawerContent";
import { ListNavigationItems, PublicListTestItems } from "../NavigationItems";
import { constant } from "../constants/constants";
import Login from "../pages/auth/Login.jsx";
import FormMChatR from "../pages/FormMChatR.jsx";
import { UserContext } from "../context/UserProvider.jsx";
import FormProfile from "../pages/profile/FormProfile.jsx";
import ListQuestionsTests from "../pages/ListQuestionsTests.jsx";
import ResultsTests from "../pages/ResultsTests.jsx";
import ModalFormTest from "./ModalFormTest.jsx";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export function StackNavigation() {
  const { userToken } = useContext(UserContext);
  return (
    <Stack.Navigator>
      {ListNavigationItems.filter((item) =>
        userToken ? item : item.needAuth !== true
      ).map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              title: "Actualizar",
              headerStyle: { backgroundColor: "#fdce75" },
            }}
          />
        );
      })}
      {PublicListTestItems.map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              title: item.name,
              headerStyle: { backgroundColor: "#fdce75" },
            }}
          />
        );
      })}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: { backgroundColor: "#fdce75" },
        }}
      />
      <Stack.Screen
        name="FormMChatR"
        component={FormMChatR}
        options={{
          title: "Actualizar",

          headerStyle: { backgroundColor: "#fdce75" },
        }}
      />
      <Stack.Screen
        name="FormProfile"
        component={FormProfile}
        options={{
          title: "Actualizar",

          headerStyle: { backgroundColor: "#fdce75" },
        }}
      />
      <Stack.Screen
        name="ListarPreguntas"
        component={ListQuestionsTests}
        options={{
          title: "Listar Preguntas",

          headerStyle: { backgroundColor: "#fdce75" },
        }}
      />
      <Stack.Screen
        name="ListarResultados"
        component={ResultsTests}
        options={{
          title: "Resultados",

          headerStyle: { backgroundColor: "#fdce75" },
        }}
      />
      <Stack.Screen
        name="FromularioTest"
        component={ModalFormTest}
        options={({ navigation }) => ({
          title: "Formulario",
          headerStyle: { backgroundColor: "#fdce75" },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                size={24}
                color="black"
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export function DrawerNav() {
  const { userToken } = useContext(UserContext);
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor: "#fdce75" },
        overlayColor: "transparent",
        drawerActiveBackgroundColor: "#e68a00",
        drawerLabelStyle: {
          color: "black",
          fontSize: constant.textFontSize,
          marginHorizontal: constant.SPACING,
          fontWeight: "500",
        },
        drawerItemStyle: {
          borderRadius: constant.borderRadius,
        },
      }}
      initialRouteName="Inicio"
    >
      {ListNavigationItems.filter((item) =>
        userToken ? item : item.needAuth !== true
      ).map((item, index) => {
        return (
          <Drawer.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              headerStyle: { backgroundColor: "#fdce75" },
              drawerType: "slide",
              drawerIcon: () => item.icon,
            }}
          />
        );
      })}
      {PublicListTestItems.map((item, index) => {
        return (
          <Drawer.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              drawerItemStyle: { display: "none" },
              headerStyle: { backgroundColor: "#fdce75" },
              drawerType: "slide",
            }}
          />
        );
      })}
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          drawerItemStyle: { display: "none" },
          headerStyle: { backgroundColor: "#fdce75" },
          drawerType: "slide",
        }}
      />
      <Drawer.Screen
        name="FormMChatR"
        component={FormMChatR}
        options={{
          title: "Actualizar",
          drawerItemStyle: { display: "none" },
          headerStyle: { backgroundColor: "#fdce75" },
          drawerType: "slide",
        }}
      />
      <Drawer.Screen
        name="FormProfile"
        component={FormProfile}
        options={{
          title: "Actualizar",
          drawerItemStyle: { display: "none" },
          headerStyle: { backgroundColor: "#fdce75" },
          drawerType: "slide",
        }}
      />
      <Drawer.Screen
        name="ListarPreguntas"
        component={ListQuestionsTests}
        options={{
          title: "Listar Preguntas",
          drawerItemStyle: { display: "none" },
          headerStyle: { backgroundColor: "#fdce75" },
          drawerType: "slide",
        }}
      />
      <Drawer.Screen
        name="ListarResultados"
        component={ResultsTests}
        options={{
          title: "Resultados",
          drawerItemStyle: { display: "none" },
          headerStyle: { backgroundColor: "#fdce75" },
          drawerType: "slide",
        }}
      />
      <Drawer.Screen
        name="StackNavigator"
        component={StackNavigation} // Aquí va el StackNavigator
        options={{
          drawerItemStyle: { display: "none" }, // Ocultar si no deseas mostrarlo en el drawer
        }}
      />
      <Drawer.Screen
        name="FromularioTest"
        component={ModalFormTest}
        options={{
          drawerItemStyle: { display: "none" },
          headerStyle: { backgroundColor: "#fdce75" },
          drawerType: "front",
        }}
      />
    </Drawer.Navigator>
  );
}

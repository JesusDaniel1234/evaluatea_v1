import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import {
  ListNavigationItems,
  PublicListTestItems,
} from "../../NavigationItems";
import Login from "../../pages/auth/Login";
import FromProfile from "../../pages/profile/FormProfile";
import FromQChat from "../../pages/FormQChat";
import FromQChat10 from "../../pages/FormQChat10";
import FormMChatR from "../../pages/FormMChatR";
import ListQuestionsTests from "../../pages/ListQuestionsTests";
import ResultsTests from "../../pages/ResultsTests";
import ModalFormTest from "../ModalFormTest";
import FormCreatePatient from "../../pages/FormCreatePatient";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import ResultsTestsDetails from "../../pages/ResultsTestsDetails";
import PatientDetails from "../../pages/PatientDetails";
import SplashScreen from "../../pages/SplashScreen";

export function StackNavigation() {
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const { userToken } = useContext(UserContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => {
          return (
            <Entypo
              name="menu"
              size={30}
              color="black"
              style={{ padding: 10 }}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            />
          );
        },
        headerStyle: { backgroundColor: "#fdce75" },
        headerTitleAlign: "center",
      }}
      initialRouteName="PantallaCarga"
    >
      {ListNavigationItems.filter((item) =>
        userToken ? item : item.needAuth !== true
      ).map((item, index) => {
        return (
          <Stack.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              title: item.name,
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
            }}
          />
        );
      })}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Iniciar Sesión",
        }}
      />
      <Stack.Screen
        name="FormMChatR"
        component={FormMChatR}
        options={{
          title: "Actualizar",
          presentation: "modal",
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="FormQChat"
        component={FromQChat}
        options={{
          title: "Actualizar",
          presentation: "modal",
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="FormQChat10"
        component={FromQChat10}
        options={{
          title: "Actualizar",
          drawerItemStyle: { display: "none" },
          presentation: "modal",
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="FormProfile"
        component={FromProfile}
        options={{
          title: "Actualizar",
          presentation: "modal",
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="ListarPreguntas"
        component={ListQuestionsTests}
        options={{
          title: "Gestión de Pareguntas",
        }}
      />
      <Stack.Screen
        name="ListarResultados"
        component={ResultsTests}
        options={{
          title: "Resultados",
        }}
      />
      <Stack.Screen
        name="FromularioTest"
        component={ModalFormTest}
        options={{
          title: "Formulario",
          headerLeft: null,
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="FromularioPaciente"
        component={FormCreatePatient}
        options={{
          presentation: "modal",
          headerLeft: null,
          headerTitle: "Crear Paciente",
        }}
      />
      <Stack.Screen
        name="DetallesResultados"
        component={ResultsTestsDetails}
        options={{
          title: "Resultados",
          presentation: "modal",
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="DetallesPaciente"
        component={PatientDetails}
        options={{
          title: "Detalles del Paciente",
          presentation: "modal",
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="PantallaCarga"
        component={SplashScreen}
        options={{
          title: "Pantalla de Carga",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

import Home from "./pages/Home";
import MChatR from "./pages/tests/MChatR";
import QChat from "./pages/tests/QChat";
import QChat10 from "./pages/tests/QChat10";
import Profile from "./pages/profile/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Foundation from "@expo/vector-icons/Foundation";
import GeneralResults from "./pages/GeneralResults";
import Patient from "./pages/Patient";

export const ListNavigationItems = [
  {
    name: "Inicio",
    component: Home,
    icon: <FontAwesome6 name="house-chimney" size={24} color="black" />,
    needAuth: false,
  },
  {
    name: "Perfil",
    component: Profile,
    icon: <Ionicons name="person" size={24} color="black" />,
    needAuth: true,
  },
  {
    name: "Informe General",
    component: GeneralResults,
    icon: <Foundation name="results" size={24} color="black" />,
    needAuth: true,
  },
  {
    name: "Pacientes",
    component: Patient,
    icon: <Ionicons name="person" size={24} color="black" />,
    needAuth: false,
  },
];

export const ListLabelsMenu = [
  {
    name: "Tests",
    icon: (
      <MaterialCommunityIcons
        name="file-document-edit"
        size={24}
        color="black"
      />
    ),
    needAuth: false,
    subMenu: [
      {
        name: "MChatR",
        navigation: "MChatR",
      },
      {
        name: "QChat",
        navigation: "QChat",
      },
      {
        name: "QChat10",
        navigation: "QChat10",
      },
    ],
  },
  {
    name: "Preguntas",
    icon: <FontAwesome name="list-ul" size={24} color="black" />,
    needAuth: true,
    subMenu: [
      {
        name: "MChatR",
        navigation: "ListarPreguntas",
      },
      {
        name: "QChat",
        navigation: "ListarPreguntas",
      },
      {
        name: "QChat10",
        navigation: "ListarPreguntas",
      },
    ],
  },
  {
    name: "Resultados",
    icon: <FontAwesome name="list-ul" size={24} color="black" />,
    needAuth: true,
    subMenu: [
      {
        name: "MChatR",
        navigation: "ListarResultados",
      },
      {
        name: "QChat",
        navigation: "ListarResultados",
      },
      {
        name: "QChat10",
        navigation: "ListarResultados",
      },
    ],
  },
];

export const PublicListTestItems = [
  {
    name: "MChatR",
    component: MChatR,
  },
  {
    name: "QChat",
    component: QChat,
  },
  {
    name: "QChat10",
    component: QChat10,
  },
];

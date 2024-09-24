import Inicio from "./pages/Inicio";
import MChatR from "./pages/tests/MChatR";
import QChat from "./pages/tests/QChat";
import QChat10 from "./pages/tests/QChat10";
import Profile from "./pages/profile/Profile";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const ListNavigationItems = [
  {
    name: "Inicio",
    component: Inicio,
    icon: <FontAwesome6 name="house-chimney" size={24} color="black" />,
  },
  {
    name: "Profile",
    component: Profile,
    icon: <Ionicons name="person" size={24} color="black" />,
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
    name: "Listar Prguntas",
    icon: <FontAwesome name="list-ul" size={24} color="black" />,
    needAuth: true,
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
    name: "Resultados",
    icon: <FontAwesome name="list-ul" size={24} color="black" />,
    needAuth: true,
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

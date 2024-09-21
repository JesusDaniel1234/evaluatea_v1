import Inicio from "./Inicio";
import MChatR from "./pages/tests/MChatR";
import Profile from "./pages/profile/Profile";
import QChat from "./pages/QChat";
import QChat10 from "./pages/tests/QChat10";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const login = false;

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
    subMenu: [
      {
        name: "MChatR",
      },
      {
        name: "QChat",
      },
      {
        name: "QChat10",
      },
    ],
  },
  {
    name: "Listar Prguntas",
    icon: <FontAwesome name="list-ul" size={24} color="black" />,
    subMenu: [
      {
        name: "MChatR",
      },
      {
        name: "QChat",
      },
      {
        name: "QChat10",
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

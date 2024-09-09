import { NavigationContainer } from "@react-navigation/native";
import DrawerNav from "./src/components/DrawerNav";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNav />
      
    </NavigationContainer>
  );
}

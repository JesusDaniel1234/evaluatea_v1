import { NavigationContainer } from "@react-navigation/native";
import DrawerNav from "./src/components/DrawerNav";
import UserProvider from "./src/context/UserProvider";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <DrawerNav />
      </NavigationContainer>
    </UserProvider>
  );
}

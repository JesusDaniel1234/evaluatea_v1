import { createContext, useEffect, useMemo, useReducer } from "react";
import axios from "axios";
import { cerrarSesion, iniciarSesion } from "../api/api.auth";
export const UserContext = createContext();
import * as SecureStore from "expo-secure-store";
import { Alert, Text, View } from "react-native";

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false, // Ya no está cargando
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true, // Comienza cargando mientras se verifica el token
      isSignout: false,
      userToken: null,
    }
  );

  // Función para iniciar sesión
  const funcIniciarSesion = async (usuario) => {
    const { data } = await iniciarSesion(usuario); // Función para iniciar sesión en tu servidor
    await SecureStore.setItemAsync("token", data.access);
    await SecureStore.setItemAsync("refresh_token", data.refresh);
    // Configura el header de autorización en axios
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    // Actualiza el estado para reflejar el inicio de sesión
    dispatch({ type: "SIGN_IN", token: data.access });
  };

  // Efecto para restaurar el token cuando la app se inicia
  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("token");
      const refreshToken = await SecureStore.getItemAsync("refresh_token");
      console.log("Este es el Token:", token);
      if (token && refreshToken) {
        // Si ambos tokens existen, restaurar el estado
        dispatch({ type: "RESTORE_TOKEN", token });
      } else {
        // Si no hay tokens, indicar que no está autenticado
        dispatch({ type: "RESTORE_TOKEN", token: null });
      }
    };

    checkAuth();
  }, []);

  // Contexto de autenticación que se comparte con otros componentes
  const authContext = useMemo(
    () => ({
      signIn: funcIniciarSesion,
      signOut: async () => {
        try{
          const accessToken = await SecureStore.getItemAsync("token");
          const refreshToken = await SecureStore.getItemAsync("refresh_token");
          // Eliminar tokens de SecureStore
          await SecureStore.deleteItemAsync("token");
          await SecureStore.deleteItemAsync("refresh_token");
          // Llamar a la API para cerrar sesión (si es necesario)
          await cerrarSesion(accessToken, refreshToken);
          // Eliminar el token de autorización de axios
          delete axios.defaults.headers.common["Authorization"];
          console.log("Sesión cerrada con éxito");
          // Actualizar el estado global para reflejar el cierre de sesión
          dispatch({ type: "SIGN_OUT" });
        } catch (e){
          Alert.alert("Error al cerrar Sesión", e)
        }
      },
    }),
    []
  );

  // Mientras la autenticación se está restaurando, mostramos una pantalla de carga o un "splash screen"
  if (state.isLoading) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <UserContext.Provider
      value={{ ...authContext, userToken: state.userToken }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

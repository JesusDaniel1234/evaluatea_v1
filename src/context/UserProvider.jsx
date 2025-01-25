import { createContext, useEffect, useMemo, useReducer } from "react";
import axios from "axios";
import {
  actualizarPerfil,
  actualizarUsuario,
  cerrarSesion,
  detallesPerfil,
  iniciarSesion,
} from "../api/api.auth";
export const UserContext = createContext();
import * as SecureStore from "expo-secure-store";
import { Alert, ToastAndroid } from "react-native";
import { jwtDecode } from "jwt-decode";
import LoadingSpinnerComponent from "../components/LoadingSpinnerComponent";

function UserProvider({ children, navigation }) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            perfilID: action.id,
            userToken: action.token,
            userData: action.userData,
            userID: action.userID,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            perfilID: action.id,
            userToken: action.token,
            userData: action.userData,
            userID: action.userID,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userData: null,
            userID: null,
          };
        case "UPDATE_USER_DATA":
          return {
            ...prevState,
            userData: action.userData,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userData: null,
      perfilID: null,
      userID: null,
    }
  );

  // Función para iniciar sesión
  const funcIniciarSesion = async (usuario) => {
    const loginResponse = await iniciarSesion(usuario);
    const token = jwtDecode(loginResponse.data.access);
    const response = await detallesPerfil(
      token.id_perfil,
      loginResponse.data.access
    );
    console.log("data",response.data)
    await SecureStore.setItemAsync("token", loginResponse.data.access);
    await SecureStore.setItemAsync("refresh_token", loginResponse.data.refresh);
    console.log("Iniciar Sesión idUsuario:",typeof token.id_usuario)
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${loginResponse.data.access}`;
    // Actualiza el estado para reflejar el inicio de sesión
    dispatch({
      type: "SIGN_IN",
      token: loginResponse.data.access,
      id: token.id_perfil,
      userData: response.data,
      userID: token.id_usuario,
    });
  };

  const funcActualizarPefil = async (data) => {
    const usuarioActualizado = await actualizarUsuario(state.userID, data);
    console.log(state.userID);
    const perfilData = {
      usuario: usuarioActualizado.data.id,
    };
    await actualizarPerfil(state.perfilID, perfilData, state.userToken);
    const response = await detallesPerfil(state.perfilID, state.userToken);
    // Después de la actualización, actualizar el contexto con los nuevos datos del usuario
    dispatch({
      type: "UPDATE_USER_DATA",
      userData: response.data, // Actualizar con los nuevos datos
    });
  };

  // Efecto para restaurar el token cuando la app se inicia
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const [dataAccess, refreshToken] = await Promise.all([
          SecureStore.getItemAsync("token"),
          SecureStore.getItemAsync("refresh_token"),
        ]);
        if (!dataAccess || !refreshToken) {
          dispatch({
            type: "RESTORE_TOKEN",
            userToken: null,
            userData: null,
            perfilID: null,
            userID: null,
          });
          return;
        }
        const token = jwtDecode(dataAccess);
        const response = await detallesPerfil(token.id_perfil, dataAccess);

        if (response.status === 401) {
          throw new Error("Token inválido");
        }

        dispatch({
          type: "RESTORE_TOKEN",
          token: dataAccess,
          id: token.id_perfil,
          userID: token.id_usuario,
          userData: response.data,
        });
      } catch (error) {
        console.log("Error verificando la autenticación: ", error);
        dispatch({
          type: "RESTORE_TOKEN",
          userToken: null,
          userData: null,
          perfilID: null,
          userID: null,
        });
      } finally {
        navigation.reset({
          index: 0,
          routes: [{ name: "Inicio" }],
        });
      }
    };
    checkAuth();
  }, []);

  // Contexto de autenticación que se comparte con otros componentes
  const authContext = useMemo(
    () => ({
      signIn: funcIniciarSesion,
      signOut: async () => {
        Alert.alert(
          "Confirmación",
          "¿Estás Seguro de querer cerrar la sesión?",
          [
            {
              text: "Cancelar",
              style: "cancel",
            },
            {
              text: "Aceptar",
              onPress: async () => {
                try {
                  const accessToken = await SecureStore.getItemAsync("token");
                  const refreshToken = await SecureStore.getItemAsync(
                    "refresh_token"
                  );
                  // Eliminar tokens de SecureStore
                  await SecureStore.deleteItemAsync("token");
                  await SecureStore.deleteItemAsync("refresh_token");
                  // Llamar a la API para cerrar sesión (si es necesario)
                  await cerrarSesion(
                    accessToken,
                    refreshToken
                  );
                  // Eliminar el token de autorización de axios
                  delete axios.defaults.headers.common["Authorization"];
                  // Actualizar el estado global para reflejar el cierre de sesión
                  dispatch({ type: "SIGN_OUT" });
                  ToastAndroid.show("Sesión Cerrada con Éxito!", ToastAndroid.SHORT);
                } catch (e) {
                  console.log(e)
                  Alert.alert("Error al cerrar Sesión");
                }
              },
              style: "destructive",
            },
          ]
        );
      },
    }),
    []
  );

  if (state.isLoading) {
    return <LoadingSpinnerComponent />;
  }

  return (
    <UserContext.Provider
      value={{
        ...authContext,
        userToken: state.userToken,
        perfilID: state.id,
        userData: state.userData,
        onSubmit: funcActualizarPefil,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;

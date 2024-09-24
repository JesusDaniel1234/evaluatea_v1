import { api } from "./axios.interceptor";

export const iniciarSesion = (usuario) =>
  api.post(
    "token_obt/",
    usuario,
    { headers: { "Content-Type": "application/json" } },
    { withCredentials: true }
  );

export const cerrarSesion = (token, refresh_token) =>
  api.post(
    "usuarios/logout/",
    { refresh_token: refresh_token },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
    { withCredentials: true }
  );

export const detallesPerfil = (id, token) =>
  api.get(`usuarios/detallar_perfil/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

export const actualizarPerfil = (id, datos, token) =>
  api.put(
    `usuarios/actualizar_perfil/${id}/`,
    datos,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    },
    {
      withCredentials: true,
    }
  );

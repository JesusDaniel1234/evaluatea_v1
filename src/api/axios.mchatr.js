import { api } from "./axios.interceptor";

// Preguntas M-Chat-R
export const listarPreguntasMChatR = (token) =>
  api.get("mchatr/detalles_preguntas_mchatr", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const listarPreguntasMChatRActivas = () =>
  api.get("mchatr/listar_preguntasactivas_mchatr");
export const detallarPreguntasMChatR = (id, token) =>
  api.get(`mchatr/detalles_preguntas_mchatr/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const crearPreguntasMChatR = (data, token) =>
  api.post("mchatr/detalles_preguntas_mchatr/", data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const actualizarPreguntasMChatR = (id, data, token) =>
  api.put(`mchatr/detalles_preguntas_mchatr/${id}/`, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const eliminarPreguntasMChatR = (id, token) =>
  api.delete(`mchatr/detalles_preguntas_mchatr/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

// Respuestas Tutor M-Chat-R
export const listarRespuestasTutorMChatR = () =>
  api.get("mchatr/listar_respuestastutor_mchatr");
export const detallarRespuestasTutorMChatR = (id) =>
  api.get(`mchatr/detallar_respuestastutor_mchatr/${id}`);
export const crearRespuestasTutorMChatR = (data) =>
  api.post("mchatr/crear_respuestastutor_mchatr/", data);
export const actualizarRespuestasTutorMChatR = (id, data) =>
  api.put(`mchatr/actualizar_respuestastutor_mchatr/${id}/`, data);
export const eliminarRespuestasTutorMChatR = (id) =>
  api.delete(`mchatr/eliminar_respuestastutor_mchatr/${id}`);

// Respuestas M-Chat-R
export const listarRespuestasMChatR = (token) =>
  api.get("mchatr/listar_respuestas_mchatr", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const detallarRespuestasMChatR = (id, token) =>
  api.get(`mchatr/detallar_respuestas_mchatr/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const crearRespuestasMChatR = (data) =>
  api.post("mchatr/crear_respuestas_mchatr/", data);
export const actualizarRespuestasMChatR = (id, data, token) =>
  api.put(`mchatr/actualizar_respuestas_mchatr/${id}/`, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const eliminarRespuestasMChatR = (id, token) =>
  api.delete(`mchatr/eliminar_respuestas_mchatr/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
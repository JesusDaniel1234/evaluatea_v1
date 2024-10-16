import { api } from "./axios.interceptor";

// Preguntas Q-Chat
export const listarPreguntasQChat = (token) =>
  api.get("qchat/listar_preguntas_qchat", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const listarPreguntasQChatActivas = () =>
  api.get("qchat/listar_preguntasactivas_qchat");
export const detallarPreguntasQChat = (id, token) =>
  api.get(`qchat/detallar_preguntas_qchat/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const crearPreguntasQChat = (data, token) =>
  api.post("qchat/crear_preguntas_qchat/", data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const actualizarPreguntasQChat = (id, data, token) =>
  api.put(`qchat/actualizar_preguntas_qchat/${id}/`, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const eliminarPreguntasQChat = (id, token) =>
  api.delete(`qchat/eliminar_preguntas_qchat/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

// Respuestas Tutor Q-Chat

export const listarRespuestasTutorQChat = (token) =>
  api.get("qchat/listar_respuestastutor_qchat", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const detallarRespuestasTutorQChat = (id, token) =>
  api.get(`qchat/detallar_respuestastutor_qchat/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const crearRespuestasTutorQChat = (data) =>
  api.post("qchat/crear_respuestastutor_qchat/", data);
export const actualizarRespuestasTutorQChat = (id, data, token) =>
  api.put(`qchat/actualizar_respuestastutor_qchat/${id}/`, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const eliminarRespuestasTutorQChat = (id, token) =>
  api.delete(`qchat/eliminar_respuestastutor_qchat/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

// Respuestas Q-Chat

export const listarRespuestasQChat = (token) =>
  api.get("qchat/listar_respuestas_qchat", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const detallarRespuestasQChat = (id) =>
  api.get(`qchat/detallar_respuestas_qchat/${id}`);
export const crearRespuestasQChat = (data) =>
  api.post("qchat/crear_respuestas_qchat/", data);
export const actualizarRespuestasQChat = (id, data, token) =>
  api.put(`qchat/actualizar_respuestas_qchat/${id}`, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const eliminarRespuestasQChat = (id, token) =>
  api.delete(`qchat/eliminar_respuestas_qchat/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

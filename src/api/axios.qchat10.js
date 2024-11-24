import { api } from "./axios.interceptor";

// Preguntas Q-Chat10
export const listarPreguntasQChat10 = (token) =>
  api.get("qchat10/listar_preguntas_qchat10", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const listarPreguntasQChat10Activas = () =>
  api.get("qchat10/listar_preguntasactivas_qchat10");
export const detallarPreguntasQChat10 = (id, token) =>
  api.get(`qchat10/detallar_preguntas_qchat10/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const crearPreguntasQChat10 = (data, token) =>
  api.post("qchat10/crear_preguntas_qchat10/", data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const actualizarPreguntasQChat10 = (id, data, token) =>
  api.put(`qchat10/actualizar_preguntas_qchat10/${id}/`, data, 
{
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  }
);
export const eliminarPreguntasQChat10 = (id, token) =>
  api.delete(`qchat10/eliminar_preguntas_qchat10/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

// Respuestas Tutor Q-Chat10
export const listarRespuestasTutorQChat10 = (token) =>
  api.get("qchat10/listar_respuestastutor_qchat10", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const detallarRespuestasTutorQChat10 = (id, token) =>
  api.get(`qchat10/detallar_respuestastutor_qchat10/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const crearRespuestasTutorQChat10 = (data, ) =>
  api.post("qchat10/crear_respuestastutor_qchat10/", data);
export const actualizarRespuestasTutorQChat10 = (id, data, token) =>
  api.put(`qchat10/actualizar_respuestastutor_qchat10/${id}/`, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const eliminarRespuestasTutorQChat10 = (id, token) =>
  api.delete(`qchat10/eliminar_respuestastutor_qcha10t/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

// Respuestas Q-Chat10
export const listarRespuestasQChat10 = (token) =>
  api.get("qchat10/listar_respuestas_qchat10", {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const detallarRespuestasQChat10 = (id, token) =>
  api.get(`qchat10/detallar_respuestas_qchat10/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const crearRespuestasQChat10 = (data) =>
  api.post("qchat10/crear_respuestas_qchat10/", data);


export const actualizarRespuestasQChat10 = (id, data, token) =>
  api.put(`qchat10/actualizar_respuestas_qchat10/${id}/`, data, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
export const eliminarRespuestasQChat10 = (id, token) =>
  api.delete(`qchat10/eliminar_respuestas_qchat10/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
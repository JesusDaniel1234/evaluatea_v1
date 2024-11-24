import {
  crearRespuestasMChatR,
  crearRespuestasTutorMChatR,
} from "../api/axios.mchatr";
import {
  crearRespuestasQChat,
  crearRespuestasTutorQChat,
} from "../api/axios.qchat";
import {
  crearRespuestasQChat10,
  crearRespuestasTutorQChat10,
} from "../api/axios.qchat10";

const crearRespuestasTutor = {
  MChatR: crearRespuestasTutorMChatR,
  QChat: crearRespuestasTutorQChat,
  QChat10: crearRespuestasTutorQChat10,
};

const crearRespuestas = {
  MChatR: crearRespuestasMChatR,
  QChat: crearRespuestasQChat,
  QChat10: crearRespuestasQChat10,
};

export { crearRespuestas, crearRespuestasTutor };

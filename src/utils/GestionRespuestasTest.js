import {
  crearRespuestasMChatR,
  crearRespuestasTutorMChatR,
  eliminarRespuestasMChatR,
} from "../api/axios.mchatr";
import {
  crearRespuestasQChat,
  crearRespuestasTutorQChat,
  eliminarRespuestasQChat,
} from "../api/axios.qchat";
import {
  crearRespuestasQChat10,
  crearRespuestasTutorQChat10,
  eliminarRespuestasQChat10,
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

const eliminarRespuestasTest = {
  MChatR: eliminarRespuestasMChatR,
  QChat: eliminarRespuestasQChat,
  QChat10: eliminarRespuestasQChat10,
};
export { crearRespuestas, crearRespuestasTutor, eliminarRespuestasTest };

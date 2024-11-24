import { eliminarRespuestasMChatR } from "../api/axios.mchatr";
import { eliminarRespuestasQChat } from "../api/axios.qchat";
import { eliminarRespuestasQChat10 } from "../api/axios.qchat10";

export const testDeleteResults = {
  MChatR: eliminarRespuestasMChatR,
  QChat: eliminarRespuestasQChat,
  QChat10: eliminarRespuestasQChat10,
};

import { api } from "./axios.interceptor";

export const listarPreguntasQChat10Activas = () =>
  api.get("qchat10/listar_preguntasactivas_qchat10");

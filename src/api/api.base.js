import { api } from "./axios.interceptor";

export const listarRespuestasQChat10 = () =>
  api.get("listar_respuestas_qchat10/");

export const detallarRespuestaQChat10 = (id) =>
  api.get(`detallar_respuestas_qchat10/${id}`);

export const listarTipoRiesgo = () => api.get("listar_tipo_riego/");

export const listarRangoRiesgo = () => api.get("listar_rango_riesgo/");

export const listarValorRiesgo = () => api.get("listar_valor_riesgo/");

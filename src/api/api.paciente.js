import { api } from "./axios.interceptor";

export const listarPacientes = () => api.get("pacientes/detalles_pacientes/");

export const detallarPaciente = (id) =>
  api.get(`pacientes/detalles_pacientes/${id}`);

export const crearPaciente = (datos) =>
  api.post("pacientes/detalles_pacientes/", datos);

export const actualizarPaciente = (id, datos) =>
  api.post(`pacientes/detalles_pacientes/${id}/`, datos);

export const eliminarPaciente = (id) =>
  api.post(`pacientes/detalles_pacientes/${id}`);

export const resultadosGenerales = () =>
  api.get("listar_resgultados_generales/");

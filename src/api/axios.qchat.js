import { api } from "./axios.interceptor";

export const listarPreguntasQChatActivas = () =>
    api.get("qchat/listar_preguntasactivas_qchat");
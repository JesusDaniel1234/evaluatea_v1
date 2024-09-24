import { api } from "./axios.interceptor";

export const listarPreguntasMChatRActivas = () =>
    api.get("mchatr/listar_preguntasactivas_mchatr");
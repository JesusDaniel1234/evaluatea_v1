import { useEffect, useState } from "react";
import { listarRespuestasMChatR } from "../api/axios.mchatr";
import { listarRespuestasQChat } from "../api/axios.qchat";
import { listarRespuestasQChat10 } from "../api/axios.qchat10";

export default function useLoadResultsTests(token, test) {
  const [respuestas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = {
    MChatR: listarRespuestasMChatR,
    QChat: listarRespuestasQChat,
    QChat10: listarRespuestasQChat10,
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const response = await load[test](token)
        setPreguntas(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [test]);
  return { respuestas, loading };
}

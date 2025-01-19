import { useEffect, useState } from "react";
import { listarRespuestasMChatR } from "../api/axios.mchatr";
import { listarRespuestasQChat } from "../api/axios.qchat";
import { listarRespuestasQChat10 } from "../api/axios.qchat10";

export default function useLoadResultsTests(token, test) {
  const [respuestas, setPreguntas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = {
    MChatR: listarRespuestasMChatR,
    QChat: listarRespuestasQChat,
    QChat10: listarRespuestasQChat10,
  };

  async function loadData() {
    setLoading(true);
    setError(null)
    try {
      const response = await load[test](token);
      setPreguntas(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const retryWithDelay = async () => {
      if (error) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        loadData();
      }
    };
    loadData();
    retryWithDelay();
  }, [test]);
  return { respuestas, loading, error, retry: loadData };
}

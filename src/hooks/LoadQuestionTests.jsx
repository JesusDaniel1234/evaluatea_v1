import { useEffect, useState } from "react";
import { listarPreguntasMChatR } from "../api/axios.mchatr";
import { listarPreguntasQChat } from "../api/axios.qchat";
import { listarPreguntasQChat10 } from "../api/axios.qchat10";

export default function useLoadQuestionTests(token, test) {
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = {
    MChatR: listarPreguntasMChatR,
    QChat: listarPreguntasQChat,
    QChat10: listarPreguntasQChat10,
  };

  async function loadData() {
    setError(null);
    setLoading(true);
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
  return { preguntas, loading, error, retry: loadData };
}

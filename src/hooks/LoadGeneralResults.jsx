import { useEffect, useState } from "react";
import { resultadosGenerales } from "../api/api.paciente";

export const useGeneralResults = () => {
  const [respuestas, setRespuestas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  async function load() {
    setLoading(true);
    try {
      const resp = await resultadosGenerales();
      setRespuestas(resp.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const retryWithDelay = async () => {
      if (error) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        load();
      }
    };
    load();
    retryWithDelay();
    load();
  }, []);

  return { loading, respuestas, error, retry: load };
};

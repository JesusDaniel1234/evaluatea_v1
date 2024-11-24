import { useEffect, useState } from "react";
import { resultadosGenerales } from "../api/api.paciente";

export const useGeneralResults = () => {
  const [respuestas, setRespuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const resp = await resultadosGenerales();
        setRespuestas(resp.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { loading, respuestas };
};

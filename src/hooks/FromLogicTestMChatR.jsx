import { useEffect, useState } from "react";
import { detallarPreguntasMChatR } from "../api/axios.mchatr";

export const useFormLogicTestMChatR = ({ id, token, setValue }) => {
  const [loading, setLoading] = useState(true);

	console.log(id, token)

  useEffect(() => {
    async function loadTask() {
      if (id) {
        try {
          setLoading(true);
          const res = await detallarPreguntasMChatR(id, token);
          console.log(res.data.respuesta_riesgo);
          setValue("contenido", res.data.contenido);
          setValue("respuesta_riesgo", res.data.respuesta_riesgo);
          setValue("activa", res.data.activa);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
    }
    if (!id) setLoading(false)
    loadTask();
  }, [id]);

  return { loading };
};

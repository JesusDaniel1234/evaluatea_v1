import { useEffect, useState } from "react";
import {
  listarRangoRiesgo,
  listarTipoRiesgo,
  listarValorRiesgo,
} from "../api/api.base";
import { detallarPreguntasQChat10 } from "../api/axios.qchat10";
import { detallarPreguntasQChat } from "../api/axios.qchat";

export const useFormLogicTest = ({ setValue, id, token, test }) => {
  
  const [tipoRiesgo, setTipoRiesgo] = useState([]);
  const [rangoRiesgo, setRangoRiesgo] = useState([]);
  const [valorRiesgo, setValorRiesgo] = useState([]);
  const [targetValue, setTargetValue] = useState(null);
  
  const [loading, setLoading] = useState(true);

  const loadTest = {
    QChat: detallarPreguntasQChat,
    QChat10: detallarPreguntasQChat10,
  };

  useEffect(() => {
    async function loadTask() {
      setLoading(true);
      try {
        const tipo = await listarTipoRiesgo();
        setTipoRiesgo(tipo.data);
        const rango = await listarRangoRiesgo();
        setRangoRiesgo(rango.data);
        if (test === "QChat10") {
          const valor = await listarValorRiesgo();
          setValorRiesgo(valor.data);
        }
        if (id) {
          const res = await loadTest[test](id, token);
          setValue("contenido", res.data.contenido);
          if (targetValue === null) {
            setTargetValue(res.data.tipo_riesgo.id);
            setValue("tipo_riesgo", res.data.tipo_riesgo.id);
          }
          if (test === "QChat10")
            setValue("valor_riesgo", res.data.valor_riesgo.id);
          setValue("rango_riesgo", res.data.rango_riesgo.id);
          setValue("activa", res.data.activa);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    loadTask();
  }, [id, test]);

  return {
    loading,
    tipoRiesgo,
    rangoRiesgo,
    valorRiesgo,
    targetValue,
    setTargetValue,
  };
};

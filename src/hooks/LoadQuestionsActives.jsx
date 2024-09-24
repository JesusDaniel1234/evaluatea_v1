import { useEffect, useState } from "react";
import { listarPreguntasMChatRActivas } from "../api/axios.mchatr";
import { listarPreguntasQChat10Activas } from "../api/axios.qchat10";
import { listarPreguntasQChatActivas } from "../api/axios.qchat";

export const useLoadQuestionMChatR = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadData() {
      try {
        const response = await listarPreguntasMChatRActivas();
        setPreguntas(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);
  return { preguntas, loading };
};

export const useLoadQuestionQChat = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadData() {
      try {
        const response = await listarPreguntasQChatActivas();
        setPreguntas(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);
  return { preguntas, loading };
};

export const useLoadQuestionQChat10 = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadData() {
      try {
        const response = await listarPreguntasQChat10Activas();
        setPreguntas(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);
  return { preguntas, loading };
};

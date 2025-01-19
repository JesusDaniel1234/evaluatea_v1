import { useEffect, useState } from "react";
import { listarPreguntasMChatRActivas } from "../api/axios.mchatr";
import { listarPreguntasQChat10Activas } from "../api/axios.qchat10";
import { listarPreguntasQChatActivas } from "../api/axios.qchat";

export const useLoadQuestionMChatR = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setError(null);
    setLoading(true);
    try {
      const response = await listarPreguntasMChatRActivas();
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
    retryWithDelay()
  }, []);

  return { preguntas, loading, error, retry: loadData };
};

export const useLoadQuestionQChat = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  async function loadData() {
    setError(null);
    setLoading(true);
    try {
      const response = await listarPreguntasQChatActivas();
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
  }, []);
  return { preguntas, loading, error, retry: loadData };
};

export const useLoadQuestionQChat10 = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  async function loadData() {
    setError(null);
    setLoading(true);
    try {
      const response = await listarPreguntasQChat10Activas();
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
  }, []);
  return { preguntas, loading, error, retry: loadData };
};

import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";

export const useLoadLocalBDdata = () => {
  const db = useSQLiteContext();
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const result = await db.getAllAsync("SELECT * FROM patient");
        setPatients(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [db]);

  return { db, patients, loading, error };
};

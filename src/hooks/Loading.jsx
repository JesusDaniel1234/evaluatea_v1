import { useState } from "react";

export const useLoading = (asyncFunction) => {
  const [loading, setLoading] = useState(false);

  const execute = async (...args) => {
    setLoading(true);
    try {
      await asyncFunction(...args);
    } finally {
      setLoading(false);
    }
  };

  return [loading, execute];
};

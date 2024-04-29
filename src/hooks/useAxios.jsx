import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (url, auth, coin, timeFrame) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (auth)
    axios.defaults.headers["x-access-token"] =
      "coinrankingc5ec94608f5ecd1796ea7627f1a5428c8e50f8bae1074cf8";

  const fetchData = async (url) => {
    try {
      const result = await axios.get(url);

      if (result.status === 200) {
        setResponse(result.data);
      } else {
        throw new Error({
          message:
            "An error has occurred while downloading data! Check your internet connection and try again.",
        });
      }
    } catch (error) {
      setError({
        message:
          "An error has occurred while downloading data! Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [coin, timeFrame]);

  return {
    response,
    loading,
    error,
  };
};

export default useAxios;

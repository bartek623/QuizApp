import { useCallback, useState } from "react";

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = useCallback(async function (
    url: string,
    applyDataFn: Function
  ) {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(url);

      if (!res.ok) throw new Error("Something went wrong, couldn't fetch data");

      const data = await res.json();

      applyDataFn(data);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
    setIsLoading(false);
  },
  []);

  return { isLoading, error, getData };
}

export default useFetch;

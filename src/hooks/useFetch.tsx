import { useCallback, useState } from "react";

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = useCallback(async function (
    url: string,
    applyDataFn: Function
  ) {
    setIsLoading(true);
    try {
      const res = await fetch(url);

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();

      // console.log(data);
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

import { useState } from "react";

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async function (url: string, applyDataFn: Function) {
    try {
      const res = await fetch(url);

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();

      console.log(data);
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    }
  };

  return { isLoading, error, getData };
}

export default useFetch;

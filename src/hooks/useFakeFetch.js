import { useState, useEffect, useRef } from "react";

export default function useFakeFetch(
  url,
  options = { method: "GET", onMount: true }
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const isLoadingRef = useRef(isLoading);
  const fetchControllerRef = useRef(new AbortController());
  const fetchDataRef = useRef(async (body) => {
    if (isLoadingRef.current) {
      return;
    }

    try {
      const { origin, path } = url;
      setIsLoading(true);
      const res = await window.client.fetch(
        { origin, path },
        {
          ...options,
          signal: fetchControllerRef.current.signal,
          body
        }
      );
      const data = await res.json();

      setData(data);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    console.log("set changed", isLoading);
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    options.onMount && fetchDataRef.current();
    return () => fetchControllerRef.current.abort();
  }, []);

  return {
    isLoading,
    error,
    data,
    fetchData: (body) => fetchDataRef.current(body)
  };
}

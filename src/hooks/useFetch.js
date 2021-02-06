import { useState, useEffect, useRef, useCallback } from "react";

export default function useFetch(
  url,
  options = { method: "GET", onMount: true }
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [fetchData, setFetchData] = useState();
  const fetchControllerRef = useRef(new AbortController());
  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    setFetchData(async (body) => {
      if (isLoadingRef.current) {
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(url, {
          ...options,
          signal: fetchControllerRef.current.signal,
          body: {
            ...options.body,
            ...body
          }
        });
        const data = await res.json();

        setData(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    });
  }, [url]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    options.onMount && fetchData();
    return () => fetchControllerRef.current.abort();
  }, [fetchData]);

  return {
    isLoading,
    error,
    data,
    fetchData: (body) => fetchData(body)
  };
}

import { useState, useEffect, useRef, useCallback } from "react";

export default function useFetch(
  url,
  options = { method: "GET", onMount: true }
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [fetchData, setFetchData] = useState(null);
  const fetchControllerRef = useRef(new AbortController());
  const isLoadingRef = useRef(isLoading);

  const createFetchData = useCallback(
    (url) => async () => {
      if (isLoadingRef.current) {
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch(url, {
          ...options,
          signal: fetchControllerRef.current.signal
        });
        const data = await res.json();

        setData(data);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  const fetchController = fetchControllerRef.current;

  useEffect(() => {
    setFetchData(createFetchData(url));
  }, [url, createFetchData]);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    options.onMount && fetchData();
    return () => fetchController.abort();
  }, [fetchData, options, fetchController]);

  return {
    isLoading,
    error,
    data,
    fetchData
  };
}

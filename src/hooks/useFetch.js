import { useState, useEffect, useCallback } from "react";
function useFetch(fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const refetch = useCallback(() => {
    setRefetchTrigger((prev) => prev + 1);
  }, []);
  useEffect(() => {
    let isMounted = true;
    const abortController = new AbortController();
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFn(abortController.signal);
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        if (isMounted) {
          setError(err.message || "failed to fetch data");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();
  }, [fetchFn, refetchTrigger, ...dependencies]);
  return {
    data,
    loading,
    error,
    refetch,
  };
}
export default useFetch;

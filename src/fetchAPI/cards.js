import useFakeFetch from "../hooks/useFakeFetch";

const endpoint = {
  origin: "http://localhost:3000",
  path: "/cards"
};

export const getCardsAPI = () => useFakeFetch(endpoint);
export const postCardAPI = () =>
  useFakeFetch(endpoint, { method: "POST", onMount: false });

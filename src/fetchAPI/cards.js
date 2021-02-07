import useFakeFetch from "../hooks/useFakeFetch";
import { createContext, useContext, useRef } from "react";

const endpoint = {
  origin: "http://localhost:3000",
  path: "/cards"
};

const CardsAPIContext = createContext({});
export const CardsAPIProvider = (props) => {
  const getCards = useFakeFetch(endpoint);
  const postCard = useFakeFetch(endpoint, { method: "POST", onMount: false });
  const deleteCard = useFakeFetch(endpoint, {
    method: "DELETE",
    onMount: false
  });

  return (
    <CardsAPIContext.Provider value={{ getCards, postCard, deleteCard }}>
      {props.children}
    </CardsAPIContext.Provider>
  );
};

export const useGetCards = () => {
  const { getCards } = useContext(CardsAPIContext);
  return getCards;
};
export const usePostCard = () => {
  const { postCard } = useContext(CardsAPIContext);
  return postCard;
};
export const useDeleteCard = () => {
  const { deleteCard } = useContext(CardsAPIContext);
  return deleteCard;
};

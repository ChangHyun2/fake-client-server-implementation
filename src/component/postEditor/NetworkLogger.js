import Loading from "../UI/Loading";
import { useGetCards, useDeleteCard, usePostCard } from "../../fetchAPI/cards";

export default function NetworkLogger() {
  const getCards = useGetCards();
  const deleteCard = useDeleteCard();
  const postCard = usePostCard();

  return (
    <div style={{ textAlign: "center", height: "30px" }}>
      {getCards.isLoading || postCard.isLoading || deleteCard.isLoading ? (
        <Loading />
      ) : (
        ""
      )}
      <div>
        {getCards.isLoading && "getting Cards..."}
        {postCard.isLoading && "posting Card..."}
        {deleteCard.isLoading && "deleting Card..."}
      </div>
    </div>
  );
}

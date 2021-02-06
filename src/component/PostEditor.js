import CardList from "./PostEditor/CardList";
import PostCard from "./PostEditor/PostCard";
import { getCardsAPI } from "../fetchAPI/cards";

export default function PostEditor() {
  const getCards = getCardsAPI();

  return (
    <div>
      <CardList getCards={getCards} />
      <PostCard getCards={getCards} />
    </div>
  );
}

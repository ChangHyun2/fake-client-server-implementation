import { useRef } from "react";
import CardList from "./postEditor/CardList";
import PostCard from "./postEditor/PostCard";
import NetworkLogger from "./postEditor/NetworkLogger";
import { CardsAPIProvider } from "../fetchAPI/cards";

export default function PostEditor() {
  return (
    <CardsAPIProvider>
      <NetworkLogger />
      <PostCard />
      <CardList />
    </CardsAPIProvider>
  );
}

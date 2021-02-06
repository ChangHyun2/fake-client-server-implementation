import Card from "./Card";
import styled from "styled-components";

const StyledCardList = styled.ul``;
export default function CardList({ getCards }) {
  const { isLoading, data, error } = getCards;

  if (isLoading) {
    return "...isLoading";
  }
  if (error) {
    console.log(error, data);
    return "error!";
  }

  if (data) {
    return (
      <StyledCardList>
        {data.length ? (
          data.map(({ title, content }) => (
            <li key={title + content + Math.random()}>
              <h2>{title}</h2>
              <p>{content}</p>
            </li>
          ))
        ) : (
          <p>Try add your card</p>
        )}
      </StyledCardList>
    );
  }

  return null;
}

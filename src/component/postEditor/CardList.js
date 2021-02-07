import Card from "./Card";
import styled from "styled-components";
import { useGetCards } from "../../fetchAPI/cards";

const StyledCardList = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  li {
    width: 33.3333%;
  }
`;

export default function CardList() {
  const getCards = useGetCards();

  const { error, data } = getCards;

  if (error) {
    return "failed to get Cards!";
  }

  if (data) {
    return (
      <>
        <StyledCardList>
          {data.length ? (
            data.map(({ id, title, content }) => (
              <Card key={id} id={id} title={title} content={content} />
            ))
          ) : (
            <p>Try add your card</p>
          )}
        </StyledCardList>
      </>
    );
  }

  return null;
}

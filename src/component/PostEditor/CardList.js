import Card from "./Card";
import styled from "styled-components";

const StyledCardList = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  li {
    width: 33.3333%;
  }
`;

export default function CardList({ getCards }) {
  const { isLoading, data, error } = getCards;
  console.log(data);
  if (error) {
    console.log(error, data);
    return "error!";
  }

  if (data) {
    return (
      <StyledCardList>
        {isLoading ? "...isLoading" : null}
        {data.length ? (
          data.map(({ id, title, content }) => (
            <li key={id}>
              <Card
                id={id}
                title={title}
                content={content}
                getCards={getCards}
              />
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

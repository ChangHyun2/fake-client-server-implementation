import React from "react";
import { deleteCardAPI, getCardsAPI } from "../../fetchAPI/cards";
import styled from "styled-components";

const StyledCard = styled.div`
  border-radius: 5px;
  border: 1.5px solid black;
  margin: 10px;

  button {
    float: right;
    margin-bottom: 8px;
    margin-right: 6px;
    width: 20px;
    height: 20px;
    background: none;
    border: none;
    font-size: 22px;
    outline: none;
    color: #777;

    cursor: pointer;

    &:hover {
      color: #111;
    }
  }

  h2 {
    padding: 0 1em;
    font-size: 20px;
    clear: both;
  }

  p {
    padding: 0 1em;
    word-wrap: break-word;
  }
`;

export default function Card({ getCards, id, title, content }) {
  const deleteCard = deleteCardAPI();

  const handleClick = async () => {
    await deleteCard.fetchData(id);
    await getCards.fetchData();
  };

  return (
    <StyledCard>
      <button onClick={handleClick}>x</button>
      <h2>{title}</h2>
      <p>{content}</p>
    </StyledCard>
  );
}

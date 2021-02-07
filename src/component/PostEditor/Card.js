import React from "react";
import { deleteCardAPI, getCardsAPI } from "../../fetchAPI/cards";
import styled from "styled-components";
import CardUI from "../UI/Card";

const StyledCard = styled(CardUI)`
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

  .header {
    clear: both;
  }

  .content {
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
      <CardUI.Header>{title}</CardUI.Header>
      <CardUI.Content>{content}</CardUI.Content>
    </StyledCard>
  );
}

import React from "react";
import { useDeleteCard, useGetCards } from "../../fetchAPI/cards";
import styled from "styled-components";
import CardUI from "../UI/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";

const StyledCard = styled(CardUI)`
  margin: 10px;
  max-width: 250px;
  align-self: flex-start;

  button {
    padding: 0;
    background: none;
    border: none;
    outline: none;

    svg {
      font-size: 16px;
      color: #777;
      transition: transform 0.1s;
      :hover {
        color: #111;
        transform: scale(1.1);
      }
    }

    cursor: pointer;
  }

  .header {
    clear: both;
  }

  .content {
    word-wrap: break-word;
  }
`;

const CardMenu = styled.div`
  float: right;
  padding: 4px 2px 3px 0;
  margin-bottom: 2px;
`;

export default function Card({ id, title, content }) {
  const deleteCard = useDeleteCard();
  const getCards = useGetCards();

  const handleClick = async () => {
    await deleteCard.fetchData({ id });
    await getCards.fetchData();
  };

  return (
    <StyledCard>
      <CardMenu>
        <button onClick={handleClick}>
          <DeleteIcon />
        </button>
        <button onClick={() => console.log("modify icon")}>
          <CreateIcon />
        </button>
      </CardMenu>
      <CardUI.Header className="header">{title}</CardUI.Header>
      <CardUI.Content className="content">{content}</CardUI.Content>
    </StyledCard>
  );
}

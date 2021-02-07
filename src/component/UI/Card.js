import styled from "styled-components";

const StyledCard = styled.div`
  border-radius: 5px;
  border: 1.5px solid black;
`;

StyledCard.Header = styled.h2`
  padding: 0 1em;
  font-size: 20px;
`;
StyledCard.Header.displayName = "card-header";

StyledCard.Content = styled.p`
  padding: 0 1em;
`;
StyledCard.Content.displayName = "card-content";

export default StyledCard;

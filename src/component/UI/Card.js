import styled from "styled-components";

const StyledCard = styled.div`
  border-radius: 5px;
  border: 2px solid #999;
`;

StyledCard.Header = styled.h2`
  padding: 0 1.5em;
  font-size: 16px;
`;
StyledCard.Header.displayName = "card-header";

StyledCard.Content = styled.p`
  padding: 0 1em;
  font-size: 12px;
`;
StyledCard.Content.displayName = "card-content";

export default StyledCard;

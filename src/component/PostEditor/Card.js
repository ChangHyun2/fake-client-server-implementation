import styled from "styled-components";

const StyledCard = styled.div`
  border-radius: 10px;
  border: 1.5px solid black;
`;

export default function Card({ title, content }) {
  return (
    <StyledCard>
      <h2>{title}</h2>
      <p>{content}</p>
    </StyledCard>
  );
}

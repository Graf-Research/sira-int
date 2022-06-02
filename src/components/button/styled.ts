import styled from "styled-components";

export const ButtonContainer = styled.div`
  background-color: #1B1C25;
  color: #FFF;
  border-radius: 3px;
  padding: 7px 14px;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonOutlineContainer = styled(ButtonContainer)`
  color: #1B1C25;
  background-color: transparent;
  border: solid 1px #1B1C25;
`;

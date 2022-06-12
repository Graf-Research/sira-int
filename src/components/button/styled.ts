import styled from "styled-components";

export const ButtonContainer = styled.div`
  background-color: #1DB954;
  color: #FFF;
  border-radius: 999px;
  padding: 10px 19px;
  cursor: pointer;
  font-family: 'Plus Jakarta Sans', sans-serif;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonOutlineContainer = styled(ButtonContainer)`
  color: #FFF;
  background-color: transparent;
  border: solid 1px #FFF;
`;

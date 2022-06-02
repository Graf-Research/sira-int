import styled from "styled-components";
import { theme } from "../../theme";

export const FormInputTextContainer = styled.div`
`;

export const CustomInputDark = styled.textarea`
  border: none;
  outline: none;
  padding: 6.5px 12px;
  font-size: 13px;
  box-sizing: border-box;
  width: calc(100%);
  color: #EEE;
  background-color: #222;
  font-family: inherit;
`;

export const CustomInputLight = styled(CustomInputDark)`
  color: #222;
  background-color: #FFF;
`;

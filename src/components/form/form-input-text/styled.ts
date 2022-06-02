import styled from "styled-components";
import { theme } from "../../theme";

export const FormInputTextContainer = styled.div``;

export const CustomInputDark = styled.input`
  border: none;
  outline: none;
  padding: 6.5px 12px;
  box-sizing: border-box;
  font-size: 13px;
  width: calc(100%);
  color: #EEE;
  background-color: #222;
`;

export const CustomInputLight = styled(CustomInputDark)`
  color: #222;
  background-color: #FFF;
`;

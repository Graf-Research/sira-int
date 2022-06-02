import styled from "styled-components";
import { theme } from "../../theme";

export const InputBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-bottom: 8px;
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  padding: 2px 3px;
  font-weight: 400;
  align-items: center;
  box-sizing: border-box;
`;

export const CenterItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const InputBoxLabelDark = styled.div`
  padding-left: 12px;
  padding-bottom: 4px;
  font-size: 13px;
  color: #BBB;
`;

export const InputBoxLabelLight = styled(InputBoxLabelDark)`
  color: #464A53;
`;

export const InputBoxErrorText = styled.div`
  padding-left: 12px;
  padding-top: 2px;
  font-size: 11px;
  color: ${theme.danger_color};
  font-weight: 300;
`;

import styled from "styled-components";
import { theme } from "../../../theme";

export const DropdownContainerDark = styled.div`
  font-weight: 400;
  font-size: 13px;
  letter-spacing: initial;
  background: #333;
  color: #EEE;
  padding: 8px 0;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.3);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
`;

export const DropdownContainerLight = styled(DropdownContainerDark)`
  background: #FFF;
  color: #111;
`;

export const DropdownItemDark = styled.div`
  width: 100%;
  padding: 5px 16px;
  box-sizing: border-box;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #222;
  }
`;

export const DropdownItemLight = styled(DropdownItemDark)`
  &:hover {
    background-color: #F0F0F0;
  }
`;

export const ActiveDropdownItemDark = styled.div`
  padding: 5px 16px;
  cursor: pointer;
  color: ${theme.primary_color};

  &:hover {
    background-color: #222;
  }
`;


export const ActiveDropdownItemLight = styled(ActiveDropdownItemDark)`
  &:hover {
    background-color: #F0F0F0;
  }
`;

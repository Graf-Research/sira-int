import styled from "styled-components";
import { theme } from "../../theme";

export const WDISidebarContainer = styled.div`
  height: 100%;
  padding-right: 21px;
  box-sizing: border-box;
  position: relative;
`;

export const ContainerSidebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: #FFF;
  height: 100%;
  width: 100%;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, .05);
  padding-top: 20px;
  border-right: solid 1px #F0F0F0;
`;

export const ContainerMenu = styled.div`
  padding: 0 0;
`;

export const Menu = styled.div`
  padding: 12px 22px;
  cursor: pointer;
  font-size: 13px;
  &:hover {
    background-color: #00000007;
  }
`;

export const ActiveMenu = styled(Menu)`
  background-color: #34DBA122;
  &:hover {
    background-color: #34DBA122;
  }
`;

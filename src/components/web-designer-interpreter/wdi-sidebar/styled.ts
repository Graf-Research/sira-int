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
  background-color: #212121;
  height: 100%;
  width: 100%;
`;

export const ContainerMenu = styled.div`
  padding: 0 0;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  padding: 12px 22px;
  cursor: pointer;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.72);
  &:hover {
    color: white;
  }
`;

export const ActiveMenu = styled(Menu)`
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(270deg, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.06) 100%);
  &:hover {
    background: linear-gradient(270deg, rgba(255, 255, 255, 0.0) 0%, rgba(255, 255, 255, 0.06) 100%);
  }
`;

export const LogoContainer = styled.div`
  margin-left: 23px;
  margin-bottom: 20px;
  margin-top: 26px;
  color: #FFF;
  font-size: 18px;
`;

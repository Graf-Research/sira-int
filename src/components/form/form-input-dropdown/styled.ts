import styled from "styled-components";

export const FormInputDropdownContainer = styled.div`
  position: relative;
`;

export const AbsolutePositionDropdown = styled.div`
  position: absolute;
  top: (100%);
  width: calc(100% + 26px);
  margin-top: 0px;
  border: solid 1px #DDD;
  box-sizing: border-box;
  margin-top: 6px;
  border-radius: 4px;
  left: -4px;
  z-index: 999;
  overflow: hidden;
`;

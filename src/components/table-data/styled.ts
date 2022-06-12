import styled from "styled-components";

export const TableDataContainer = styled.div`
  overflow: auto;
  width: 100%;
  background-color: #121212;
`;

export const MainTable = styled.table`
  width: 100%;
  border-spacing:0;
  border-collapse: collapse;
  white-space: nowrap;
  border: solid 1px #444;
`;

export const THead = styled.thead``;

export const TBody = styled.tbody``;

export const TH = styled.th`
  border-bottom: solid 1px #444;
  padding: 12px 14px;
  background-color: #212121;
  color: #FFF;
  font-weight: 500;
  text-align: left;
`;

export const TR = styled.tr`
  background-color: #121212;

  &:nth-child(even) {
    background-color: #191919;
  }

  &:hover {
    background-color: #222;
  }
`;

export const TD = styled.td`
  border-bottom: solid 1px #444;
  padding: 12px 14px;
  color: #E0E0E0;
`;
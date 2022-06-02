import styled from "styled-components";

export const TableDataContainer = styled.div`
  overflow: auto;
  width: 100%;
  background-color: #FFF;
`;

export const MainTableDark = styled.table`
  width: 100%;
  border-spacing:0;
  border-collapse: collapse;
  white-space: nowrap;
`;

export const MainTableLight = styled(MainTableDark)`
`;

export const THead = styled.thead``;

export const TBody = styled.tbody``;

export const THDark = styled.th`
  border-bottom: solid 1px #444;
  padding: 12px 14px;
  background-color: #111;
  color: #DDD;
  font-weight: 500;
  text-align: left;
`;

export const THLight = styled(THDark)`
  border-color: #E7EAEA;
  background-color: #F8F8F9;
  color: #2D4047;
`;

export const TRDark = styled.tr`
  background-color: #2A2A2A;
`;

export const TRLight = styled(TRDark)`
  border-color: #E7EAEA;
  background-color: #FFF;
  &:hover {
    background-color: #FFF5E8;
  }
`;

export const TDDark = styled.td`
  border-bottom: solid 1px #444;
  padding: 6px 14px;
  font-size: .95em;
  color: #2D4047;
`;

export const TDLight = styled(TDDark)`
  border-color: #E7EAEA;
  color: #222;
`;

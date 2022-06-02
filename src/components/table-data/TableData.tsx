import React from "react";
import { ExecutionTime } from "../table.util";
import { MainTableDark, MainTableLight, TableDataContainer, THead, TBody, TDDark, TDLight, THDark, THLight, TRDark, TRLight } from "./styled";

type SNBType = string | number | boolean | JSX.Element;

interface TableDataProps {
  queryName?: string
  header?: string[]
  data?: SNBType[][]
  executionTime?: ExecutionTime
}

export function TableData(props: TableDataProps) {
  const is_dark_mode = false;

  const MainTable = is_dark_mode ? MainTableDark : MainTableLight;
  const TD = is_dark_mode ? TDDark : TDLight;
  const TH = is_dark_mode ? THDark : THLight;
  const TR = is_dark_mode ? TRDark : TRLight;

  return (
    <div>
      <TableDataContainer>
        <MainTable cellSpacing={0}>
          <THead>
            <TR>
              {
                (props.header ?? []).map((title: string, i: number) => (
                  <TH key={i}>
                    { title }
                  </TH>
                ))
              }
            </TR>
          </THead>
          <TBody>
            {
              (props.data ?? []).map((values: SNBType[], i: number) => (
                <TR key={i}>
                  {
                    values.map((value: SNBType, j: number) => (
                      <TD key={j}>
                        { value }
                      </TD>
                    ))
                  }
                </TR>
              ))
            }
          </TBody>
        </MainTable>
      </TableDataContainer>
      { (props.queryName && props.executionTime) && <div style={{ color: is_dark_mode ? '#CCC' : '#333', marginTop: 12, fontSize: 14 }}>
        Query '{ props.queryName }' success! Execution time {(props.executionTime.end - props.executionTime.start).toFixed(2)} ms running on {props.executionTime.timestamp.toISOString()}
      </div> }
    </div>
  );
}

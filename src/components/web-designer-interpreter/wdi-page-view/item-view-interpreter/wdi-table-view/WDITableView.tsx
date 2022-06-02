import React, { useEffect } from "react";
import moment from "moment";
import { ItemTable, ItemTableButton, ItemTableCell, ViewComponentTable } from "sira-lang/lib/sira.interface";
import { Button } from "../../../../button/Button";
import { TableData } from "../../../../table-data/TableData";
import { StatementExec } from "../../../statement-exec";
import { searchGlobalDataRow, searchGlobalDataTable, SiraState, SiraStateDataRow, SiraStateDataTable } from "../../../statement.interface";
import { WDIPreviewBody, WDIPreviewColumn, WDIPreviewHeader, WDIPreviewRow, WDIPreviewTable, WDITableViewContainer, WDITableViewPreviewContainer } from "./styled";
import { SNBType } from "../../../../table.util";

interface WDITableButtonProps {
  data: ItemTableButton
  state: SiraState
  setState(state: SiraState): void
}

function WDITableButton(props: WDITableButtonProps) {
  async function onClick() {
    const statement_exec = new StatementExec({
      parent_state: props.state,
      statements: props.data.data.statements
    });
    statement_exec.execute();
    props.setState(props.state);
  }

  return (
    <div style={{ display: 'flex' }}>
      <Button onClick={onClick} style={{ padding: '6px 16px' }}>
        { props.data.data.label }
      </Button>
    </div>
  );
}

interface WDITableViewProps {
  data: ViewComponentTable
  state: SiraState
  setState(state: SiraState): void
}

export function WDITableView(props: WDITableViewProps) {
  const table_header = props.data.data.items.map((it: ItemTable) => it.type === 'button' ? '' : it.data.label);

  function getTableData(): SNBType[][] {
    const table: SiraStateDataTable | undefined = searchGlobalDataTable(props.state, props.data.data.source);
    if (!table) {
      throw new Error(`Table source '${props.data.data.source}' on table '${props.data.data.name}' undefined`);
    }
    
    return table.value.map((row: any, i: number) => props.data.data.items.map((it: ItemTable) => {
      switch (it.type) {
        case 'button':
          const inner_state: SiraState = {
            parent: props.state,
            data: {
              [props.data.data.source]: {
                type: 'row',
                value: row
              } as SiraStateDataRow
            }
          };
          return (
            <WDITableButton
              state={inner_state}
              setState={props.setState}
              data={it} />
          );
        default:
          const item_table_cell: ItemTableCell = it;
          let values: any = {};

          // Search item on local row or global variable
          if (item_table_cell.data.source.variable.table === props.data.data.source) {
            values = row;
          } else {
            values = searchGlobalDataRow(props.state, item_table_cell.data.source.variable.table);
            if (!values) {
              throw new Error(`Row '${item_table_cell.data.source.variable.table}' undefined on table '${props.data.data.name}'`);
            }
          }

          // access column/attribute value
          const value = values[item_table_cell.data.source.variable.column];

          switch (item_table_cell.data.source.type) {
            case 'numeric':
              console.log('value', value);
              return (value ? String(value) : '0').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            case 'date':
              return moment(value).format('YYYY-MM-DD');
            case 'datetime':
              return moment(value).format('YYYY-MM-DD HH:mm');
            default:
              return value;
          }
      }
    }));
  }
  
  return (
    <WDITableViewContainer>
      <div style={{ marginBottom: 8, fontSize: 20, fontWeight: 700, color: '#444' }}>
        { props.data.data.name }
      </div>
      <TableData 
        header={table_header}
        data={getTableData()} />
    </WDITableViewContainer>
  );
}

interface WDITableViewPreviewProps {
  data: ViewComponentTable
}

export function WDITableViewPreview(props: WDITableViewPreviewProps) {
  const table_header = props.data.data.items.map((it: ItemTable) => it.type === 'button' ? '' : it.data.label);

  function getItemPreview(it: ItemTable) {
    switch (it.type) {
      case 'button': 
        return (
          <Button style={{ padding: '5px 12px', fontSize: 10 }}>
            { it.data.label } 
          </Button>
        );
      case 'cell':
        switch (it.data.source.type) {
          case 'bigtext':
          case 'dropdown':
          case 'text':
            return (
              <div>
                Sample
              </div>
            );
          case 'numeric':
            return <div>99.999</div>
          case 'date':
            return <div>2020-02-02</div>
          case 'time':
            return <div>12:00</div>
          case 'datetime':
            return <div>2020-02-02 12:00</div>
        }
    }
  }

  return (
    <WDITableViewPreviewContainer>
      <div style={{ marginBottom: 8, fontSize: '1.2em' }}>
        { props.data.data.name }
      </div>
      <WDIPreviewTable>
        <WDIPreviewHeader>
          <WDIPreviewRow>
            {
              table_header.map((label: string, i: number) => (
                <WDIPreviewColumn key={i}>
                  { label }
                </WDIPreviewColumn>
              ))
            }
          </WDIPreviewRow>
        </WDIPreviewHeader>
        <WDIPreviewBody>
          <WDIPreviewRow>
            {
              props.data.data.items.map((it: ItemTable, i: number) => (
                <WDIPreviewColumn key={i}>
                  { getItemPreview(it) }
                </WDIPreviewColumn>
              ))
            }
          </WDIPreviewRow>
          <WDIPreviewRow>
            {
              props.data.data.items.map((it: ItemTable, i: number) => (
                <WDIPreviewColumn key={i}>
                  { getItemPreview(it) }
                </WDIPreviewColumn>
              ))
            }
          </WDIPreviewRow>
        </WDIPreviewBody>
      </WDIPreviewTable>
    </WDITableViewPreviewContainer>
  );
}

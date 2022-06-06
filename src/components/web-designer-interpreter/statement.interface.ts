export interface SiraStateDataTable {
  type: 'table'
  value: any[]
}

export interface SiraStateDataRow {
  type: 'row'
  value: any
}

export interface SiraStateDataCell {
  type: 'cell'
  value: any
}

export type SiraStateData = SiraStateDataCell | SiraStateDataRow | SiraStateDataTable;

export interface SiraState {
  data: {[key: string]: SiraStateData}
  parent?: SiraState
}

export interface StatementResultTable {
  break: boolean
  result: any[]
};
export interface StatementResultRow {
  break: boolean
  result: any
};
export interface StatementResultAny {
  break: boolean
  result?: any
};
export type StatementResult = StatementResultTable | StatementResultRow | StatementResultAny;

export interface HTTPCallQuery {
  endpoint: string
  query: string
  data?: any
}

export type HTTPResult = {[key: string]: any}[]

export function searchLocalDataCell(state: SiraState, variable: string): SiraStateDataCell | undefined {
  const value = state.data[variable];
  if (!value || value.type !== 'cell') {
    return undefined;
  }
  return value;
}

export function searchLocalDataRow(state: SiraState, variable: string): SiraStateDataRow | undefined {
  const value = state.data[variable];
  if (!value || value.type !== 'row') {
    return undefined;
  }
  return value;
}

export function searchLocalDataTable(state: SiraState, variable: string): SiraStateDataTable | undefined {
  const value = state.data[variable];
  if (!value || value.type !== 'table') {
    return undefined;
  }
  return value;
}

export function searchGlobalDataCell(state: SiraState, variable: string): SiraStateDataCell | undefined {
  const result = searchLocalDataCell(state, variable);
  if (result) {
    return result;
  }
  if (state.parent) {
    return searchGlobalDataCell(state.parent, variable);
  }
  return undefined;
}

export function searchGlobalDataRow(state: SiraState, variable: string): SiraStateDataRow | undefined {
  const result = searchLocalDataRow(state, variable);
  if (result) {
    return result;
  }
  if (state.parent) {
    return searchGlobalDataRow(state.parent, variable);
  }
  return undefined;
}

export function searchGlobalDataTable(state: SiraState, variable: string): SiraStateDataTable | undefined {
  const result = searchLocalDataTable(state, variable);
  if (result) {
    return result;
  }
  if (state.parent) {
    return searchGlobalDataTable(state.parent, variable);
  }
  return undefined;
}

export function searchState(state: SiraState, variable: string): SiraState | undefined {
  if (state.data[variable]) {
    return state;
  }
  if (state.parent) {
    return searchState(state.parent, variable);
  }
  return undefined;
}

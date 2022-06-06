import axios from "axios";
import { Param, Query, QueryMultiRowParams, QuerySingleRowParams, Statement, StatementAlert, StatementConfirm, StatementGoto, StatementQuery, StatementVariableAssignment } from "sira-lang/lib/sira.interface";
import { HTTPCallQuery, HTTPResult, searchGlobalDataCell, searchGlobalDataRow, searchGlobalDataTable, searchState, SiraState, SiraStateDataCell, SiraStateDataRow, SiraStateDataTable, StatementResult } from "./statement.interface";

export interface StatementExecConfig {
  query_base_url: string
  headers: {[key: string]: string}
  onUnauthorizedHTTPResponse?(): void
}

export interface IStatementExec {
  parent_state: SiraState
  statements: Statement[]
}

export class StatementExec {
  public static config: StatementExecConfig;
  private statements: Statement[];
  private state: SiraState = {
    data: {}
  };

  constructor(params: IStatementExec) {
    if (!StatementExec.config) {
      throw new Error(`Config must be set before create instance`);
    }
    this.statements = params.statements;
    this.state.parent = params.parent_state;
    axios.defaults.baseURL = StatementExec.config.query_base_url;
    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      ...StatementExec.config.headers
    };
  }

  public async execute(): Promise<SiraState> {
    let break_loop: boolean = false;
    for await (const statement of this.statements) {
      switch (statement.type) {
        case 'alert':
          break_loop = (await this.__execAlert(statement)).break;
          break;
        case 'confirm':
          break_loop = (await this.__execConfirm(statement)).break;
          break;
        case 'goto':
          break_loop = (await this.__execGoto(statement)).break;
          break;
        case 'query':
          break_loop = (await this.__execQuery(statement)).break;
          break;
        case 'variable-assignment':
          break_loop = (await this.__execVariableAssignment(statement)).break;
          break;
      }
      if (break_loop) {
        break;
      }
    }

    return this.state;
  }

  public async __execAlert(statement: StatementAlert): Promise<StatementResult> {
    alert(statement.data);
    return {
      break: false
    };
  }

  public async __execConfirm(statement: StatementConfirm): Promise<StatementResult> {
    return {
      break: !confirm(statement.data)
    };
  }

  public async __execGoto(statement: StatementGoto): Promise<StatementResult> {
    const params: any = {
      page: statement.data.page
    };
    for (const param of statement.data.params) {
      params[param.variable] = this.getDataFromParam(param);
    }
    window.location = `?${new URLSearchParams(params).toString()}` as any;
    return {
      break: true
    };
  }

  public async __execQuery(statement: StatementQuery): Promise<StatementResult> {
    const http_call_query: HTTPCallQuery = this.generateHTTPCallQuery(statement.data);
    const http_result: HTTPResult = await this.callHttp(http_call_query);
    const result = http_result;
    return {
      break: false,
      result
    };
  }

  public async __execVariableAssignment(statement: StatementVariableAssignment): Promise<StatementResult> {
    const variable_state: SiraState = searchState(this.state, statement.data.variable) ?? this.state;
    switch (statement.data.type) {
      case 'empty-cell':
        variable_state.data[statement.data.variable] = {
          type: 'cell',
          value: ""
        } as SiraStateDataCell;
        break;
      case 'string-cell':
        variable_state.data[statement.data.variable] = {
          type: 'cell',
          value: statement.data.value
        } as SiraStateDataCell;
        break;
      case 'numeric-cell':
        variable_state.data[statement.data.variable] = {
          type: 'cell',
          value: statement.data.value
        } as SiraStateDataCell;
        break;
      case 'empty-row':
        variable_state.data[statement.data.variable] = {
          type: 'row',
          value: {}
        } as SiraStateDataRow;
        break;
      case 'empty-table':
        variable_state.data[statement.data.variable] = {
          type: 'table',
          value: []
        } as SiraStateDataTable;
        break;
      case 'query-row':
        const http_call_query_row: HTTPCallQuery = this.generateHTTPCallQuery(statement.data.value);
        const http_result_row: HTTPResult = await this.callHttp(http_call_query_row);
        const row_value = http_result_row[0];
        variable_state.data[statement.data.variable] = {
          type: 'row',
          value: row_value
        } as SiraStateDataRow;
        break;
      case 'query-table':
        const http_call_query_table: HTTPCallQuery = this.generateHTTPCallQuery(statement.data.value);
        const http_result_table: HTTPResult = await this.callHttp(http_call_query_table);
        const table_value = http_result_table;
        variable_state.data[statement.data.variable] = {
          type: 'table',
          value: table_value
        } as SiraStateDataTable;
        break;
    }
    return {
      break: false
    };
  }

  generateHTTPCallQuery(query: Query): HTTPCallQuery {
    switch (query.type) {
      case 'empty-params':
        return {
          query: query.query,
          endpoint: `/run-query`
        }
      case 'single-row-params':
        return {
          query: query.query,
          endpoint: `/run-query`,
          data: this.generateCallDataRow(query)
        }
      case 'multi-row-params':
        return {
          query: query.query,
          endpoint: `/run-query`,
          data: this.generateCallDataTable(query)
        }
    }
  }

  private generateCallDataRow(query: QuerySingleRowParams): any {
    const data: any = {};
    for (const param of query.params) {
      data[param.variable] = this.getDataFromParam(param);
    }

    return data;
  }

  private generateCallDataTable(query: QueryMultiRowParams): any[] {
    const source_data_table: SiraStateDataTable | undefined = searchGlobalDataTable(this.state, query.source);
    if (!source_data_table) {
      throw new Error(`Source data table '${query.source}' undefined`);
    }

    const data: any = [];
    for (let i = 0; i < source_data_table.value.length; i++) {
      const inner_data: any = {};
      for (const param of query.params) {
        if (param.type === 'variable-access' && param.value.table === query.source) {
          inner_data[param.variable] = source_data_table.value[i][param.value.column];
          continue;
        }
        inner_data[param.variable] = this.getDataFromParam(param);
      }
      data.push(inner_data);
    }

    return data;
  }

  private getDataFromParam(param: Param): any {
    switch (param.type) {
      case 'param':
        console.log(this.state, param);
        const cell_data = searchGlobalDataCell(this.state, param.value);
        if (!cell_data) {
          throw new Error(`Param '${param.value}' undefined`);
        }
        return cell_data.value;
      case 'variable-access':
        const row_data = searchGlobalDataRow(this.state, param.value.table);
        if (!row_data) {
          throw new Error(`Row '${param.value.table}' undefined`);
        }
        return row_data.value[param.value.column];
    }
  }

  private async callHttp(data: HTTPCallQuery): Promise<HTTPResult> {
    try {
      return (await axios.post(`${data.endpoint}?label=${data.query}`, {params: data.data})).data;
    } catch (err) {
      if (err.response.status === 401 && StatementExec.config.onUnauthorizedHTTPResponse) {
        StatementExec.config.onUnauthorizedHTTPResponse();
      }
      throw new Error(err.response.data.toString());
    }
  }
}

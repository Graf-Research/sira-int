export type SNBType = string | number | boolean;

export interface QueryResult {
  queryName?: string
  header: string[]
  data: SNBType[][]
}

export interface ExecutionTime {
  timestamp: Date
  start: number
  end: number
}
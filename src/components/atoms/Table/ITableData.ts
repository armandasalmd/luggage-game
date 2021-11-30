export interface ITableColumnDefinition {
  key: string;
  title: string;
}

export interface ITableData<T> {
  columnDefinitions: ITableColumnDefinition[];
  rows: T[];
}

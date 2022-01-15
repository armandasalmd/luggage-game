import { ReactElement } from "react";

export interface ITableColumnDefinition {
  key: string;
  title: string;
}

export interface ITableData<T> {
  columnDefinitions: ITableColumnDefinition[];
  rows: T[];
}

export interface CellRenderer {
  key: string;
  renderer(cellData: any): ReactElement;
}
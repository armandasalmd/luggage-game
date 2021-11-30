import { FC } from "react";
import classNames from "classnames";
import "./Table.scss";
import { ColorType } from "@utils/Types";
import { ITableData, ITableColumnDefinition } from "./ITableData";

interface TableProps {
  columnsSeparated?: boolean;
  expandable?: boolean;
  fullWidth?: boolean;
  spaced?: boolean;
  wrapLines?: boolean;
  scrollX?: boolean;
  colorType?: ColorType;
  data: ITableData<any>;
}

const Table: FC<TableProps> = (props) => {
  const classes = classNames("table", {
    "table--wrapLines": props.wrapLines,
    "table--spaced": props.spaced,
    "table--fullWidth": props.fullWidth,
    "table--expandable": props.expandable,
    "table--columnsSeparated": props.columnsSeparated,
    "table--secondary": props.colorType === "secondary"
  });

  function createRowCells(columnDefs: ITableColumnDefinition[], row: any) {
    return columnDefs.map(function (column) {
      return <td className="table__cell">{row[column.key]}</td>
    });
  }

  const tableHeadColumns = props.data.columnDefinitions.map(function (column) {
    return <td className="table__cell" key={column.key}>{column.title}</td>
  });

  const tableRows = props.data.rows.map(function (row) {
    return <tr className="table__row">
      {createRowCells(props.data.columnDefinitions, row)}
    </tr>;
  });

  const table = (
    <table>
      <thead className="table__head">
        <tr className="table__row">
          {tableHeadColumns}
        </tr>
      </thead>
      <tbody className="table__body">
        {tableRows}
      </tbody>
    </table>
  );

  return (
    <div className={classes}>
      {props.scrollX && <div className="table__scroll">{table}</div>}
      {!props.scrollX && table}
    </div>
  );
};

export default Table;

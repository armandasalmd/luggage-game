import { FC } from "react";
import { Table } from "@components/atoms";

import { tableData } from "./tableData";

const GamesHistoryTab: FC = () => {
  return (
    <div>
      <Table scrollX spaced data={tableData} />
    </div>
  );
};

export default GamesHistoryTab;
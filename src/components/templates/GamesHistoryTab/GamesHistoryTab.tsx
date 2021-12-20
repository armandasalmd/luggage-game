import { FC } from "react";
import { Card, Table } from "@components/atoms";

import { tableData } from "./tableData";

const GamesHistoryTab: FC = () => {
  return (
    <Card>
      <Table scrollX spaced data={tableData} />
    </Card>
  );
};

export default GamesHistoryTab;
import { FC, useState } from "react";

import "./GamesHistoryTab.scss";
import {
  Card,
  Empty,
  Pagination,
  ProfitNumber,
  Table,
} from "@components/atoms";
import { CellRenderer } from "@components/atoms/Table/ITableData";
import { tableData } from "./tableData";

const GamesHistoryTab: FC = () => {
  const [historyData] = useState([]); // replace with useGameHistory();

  const renderers: CellRenderer[] = [
    {
      key: "price",
      renderer: (data: any) => <ProfitNumber value={parseInt(data)} />,
    },
  ];

  return (
    <Card className="history" title="Your games history" noContentPaddingX>
      {historyData.length === 0 && <Empty text="No games played yet" />}
      {historyData.length !== 0 && (
        <>
          <div className="history__table">
            <Table
              fullWidth
              scrollX
              spaced
              data={tableData}
              renderers={renderers}
            />
          </div>
          <div className="history__pages">
            <Pagination pageCount={1} />
          </div>
        </>
      )}
    </Card>
  );
};

export default GamesHistoryTab;

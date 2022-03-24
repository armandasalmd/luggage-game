import { FC, useState } from "react";

import "./GamesHistoryTab.scss";
import {
  Card,
  Empty,
  Pagination,
  ProfitNumber,
  Table,
} from "@components/atoms";
import { CellRenderer, ITableData, ITableColumnDefinition } from "@components/atoms/Table/ITableData";
import { IHistoryItem } from "@utils/game/IHistoryItem";
import useGameHistory from "@hooks/useGameHistory";
import GlobalUtils from "@utils/Global";

const columnDefinitions: ITableColumnDefinition[] = [
  { key: "place", title: "Place" },
  { key: "reward", title: "Reward"},
  { key: "playerCount", title: "Players count"},
  { key: "roomId", title: "Room code"},
  { key: "date", title: "Date"}
];

const GamesHistoryTab: FC = () => {
  const { historyData, jump, maxPage } = useGameHistory(5); // replace with useGameHistory();

  const renderers: CellRenderer[] = [
    {
      key: "reward",
      renderer: (data: any) => <ProfitNumber value={parseInt(data)} />,
    },
    {
      key: "date",
      renderer: (date: any) => <p>{GlobalUtils.toDisplayDate(date)}</p>
    }
  ];

  const tableData: ITableData<IHistoryItem> = {
    columnDefinitions,
    rows: historyData
  };

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
            <Pagination onChange={jump} pageCount={maxPage} />
          </div>
        </>
      )}
    </Card>
  );
};

export default GamesHistoryTab;

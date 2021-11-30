import { FC } from "react";
import { Card, TabItem } from "@components/atoms";
import { Tabs } from "@components/molecules";
import { DashboardNavbar } from "@components/organisms";
import {
  DashboardCreateJoinTab,
  GameRulesTab,
  GamesHistoryTab,
} from "@components/templates";

const DashboardPage: FC = () => {
  return (
    <div className="dashboard">
      <DashboardNavbar name="dragonslayer12" coins="1 350 coins" />
      <Card
        noContentPaddingX
        noContentPaddingY
        style={{ margin: 16 }}
        title="Luggage game dashboard"
      >
        <Tabs defaultActiveTab={1}>
          <TabItem text="Create or join game" id={1}>
            <DashboardCreateJoinTab />
          </TabItem>
          <TabItem text="Game rules" id={2}>
            <GameRulesTab />
          </TabItem>
          <TabItem text="Games history" id={3}>
            <GamesHistoryTab />
          </TabItem>
        </Tabs>
      </Card>
    </div>
  );
};

export default DashboardPage;

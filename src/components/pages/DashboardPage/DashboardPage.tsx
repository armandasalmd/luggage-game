import React, { FC } from "react";
import { Card, TabItem } from "@components/atoms";
import { Tabs } from "@components/molecules";
import { DashboardNavbar } from "@components/organisms";
import {
  DashboardCreateJoinTab,
  GameRulesTab,
  GamesHistoryTab,
} from "@components/templates";

const PAGE_TITLE = "Luggage game dashboard";

const DEFAULT_ACTIVE_TAB = 1;
const TABS = [
  {
    id: 1,
    text: "Create or join game",
    component: DashboardCreateJoinTab,
  },
  {
    id: 2,
    text: "Game rules",
    component: GameRulesTab,
  },
  {
    id: 3,
    text: "Games history",
    component: GamesHistoryTab,
  },
];

const DashboardPage: FC = () => {
  const tabs = TABS.map(({ component, ...rest }) => (
    <TabItem key={rest.id} {...rest}>
      {React.createElement(component)}
    </TabItem>
  ));

  return (
    <div className="dashboard">
      <DashboardNavbar name="dragonslayer12" coins="1 350" />
      <Card
        noContentPaddingX
        noContentPaddingY
        style={{ margin: 16 }}
        title={PAGE_TITLE}
      >
        <Tabs defaultActiveTab={DEFAULT_ACTIVE_TAB} mobileFriendlyMenu mobileMenuItems={TABS}>{tabs}</Tabs>
      </Card>
    </div>
  );
};

export default DashboardPage;
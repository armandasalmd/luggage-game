import React, { FC, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, message, PillButton, TabItem } from "@components/atoms";
import { Tabs } from "@components/molecules";
import { DashboardNavbar } from "@components/organisms";
import {
  FriendsTab,
  PlayGameTab,
  GameRulesTab,
  GamesHistoryTab,
} from "@components/templates";
import AddIcon from "@material-ui/icons/Add";
import TollIcon from "@material-ui/icons/Toll";
import { ID } from "@utils/Types";
import { RootState } from "@redux/store";
import "./DashboardPage.scss";
import { fetchCoinsAndRewards } from "@redux/actions";

const PAGE_TITLE = "Game menu";
const DEFAULT_ACTIVE_TAB = 1;
const TABS = [
  {
    id: 1,
    text: "Play game",
    component: PlayGameTab,
  },
  {
    id: 2,
    text: "Friends",
    component: FriendsTab,
  },
  {
    id: 3,
    text: "Games history",
    component: GamesHistoryTab,
  },
  {
    id: 4,
    text: "Rules",
    component: GameRulesTab,
  },
];

const DashboardPage: FC = () => {
  const [tabId, setTabId] = useState<ID>(DEFAULT_ACTIVE_TAB);
  const { coins } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  function onAddCoins() {
    message.information("Cannot purchase coins yet");
  }

  const tabs = TABS.map(({ component, ...rest }) => (
    <TabItem key={rest.id} {...rest}>
      {React.createElement(component)}
    </TabItem>
  ));

  const headerActions = (
    <div>
      <PillButton
        prefix={<TollIcon />}
        onSuffixClick={onAddCoins}
        suffix={<AddIcon />}
      >
        {coins >= 0 ? coins : "loading"}
      </PillButton>
    </div>
  );

  const activeTab: any = TABS.find(function (tab: any) {
    return tab.id === tabId;
  });

  let tabContainer;

  if (activeTab) {
    tabContainer = React.createElement(activeTab.component);
  }

  useEffect(() => {
    if (!coins || coins < 0) {
      dispatch(fetchCoinsAndRewards());
    }
  }, [dispatch, coins]);

  return (
    <div className="dashboard">
      <DashboardNavbar />
      <Card
        noContentPaddingX
        noContentPaddingY
        className="dashboard__nav"
        title={PAGE_TITLE}
        headerActions={headerActions}
        smallHeaderY
      >
        <Tabs
          defaultActiveTab={DEFAULT_ACTIVE_TAB}
          mobileFriendlyMenu
          mobileMenuItems={TABS}
          noDivider
          externalRender
          onTabChange={setTabId}
          resetOnNavbarLogoClick
        >
          {tabs}
        </Tabs>
      </Card>
      <div className="dashboard__mobileDivider">
        <div className="line"></div>
        <div className="ball"></div>
      </div>
      <div className="dashboard__main">
        {tabContainer}
      </div>
    </div>
  );
};

export default DashboardPage;

import { FC } from "react";
import {
  Card,
  PillButton,
  TabItem
} from "@components/atoms";
import { Tabs } from "@components/molecules";
import { Navbar } from "@components/organisms";
import { DashboardCreateJoinTab, GameRulesTab } from "@components/templates";

import PersonIcon from "@material-ui/icons/Person";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import TollIcon from "@material-ui/icons/Toll";
import AddIcon from "@material-ui/icons/Add";

const DashboardPage: FC = () => {
  return (
    <div className="dashboard">
      <Navbar>
        <PillButton
          prefix={<TollIcon />}
          suffix={<AddIcon />}
          colorType="secondary"
        >
          1235 coins
        </PillButton>
        <PillButton
          prefix={<PersonIcon />}
          suffix={<LogoutIcon />}
          colorType="secondary"
        >
          dragonslayer12
        </PillButton>
      </Navbar>
      <Card noContentPaddingX noContentPaddingY style={{ margin: 16 }} title="Luggage game dashboard">
        <Tabs defaultActiveTab={1}>
          <TabItem text="Create or join game" id={1}>
            <DashboardCreateJoinTab />
          </TabItem>
          <TabItem text="Game rules" id={2}>
            <GameRulesTab />
          </TabItem>
          <TabItem text="Games history" id={3}>
            Tab item 3
          </TabItem>
          <TabItem text="Friends" id={4}>
            Tab item 4
          </TabItem>
        </Tabs>
      </Card>
    </div>
  );
};

export default DashboardPage;

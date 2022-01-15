import { useState } from "react";

import "./GameRulesTab.scss";
import { Card } from "@components/atoms";
import { GameRulesSelect } from "@components/molecules";
import { ID } from "@utils/Types";
import {
  ClassicRules,
  MorePowerCardsRules,
  SharedRules,
  ShitheadRules,
} from "./rules";

const GameRulesTab = () => {
  const [rules, setRules] = useState<ID>("classic");

  return (
    <Card className="gameRules">
      <SharedRules />
      <GameRulesSelect
        title="Select game rules"
        defaultSelectedId={rules}
        onChange={setRules}
      />
      {rules === "classic" && <ClassicRules anySameKind={false} />}
      {rules === "classicAnyOfSameKind" && <ClassicRules anySameKind={true} />}
      {rules === "morePowerCards" && <MorePowerCardsRules />}
      {rules === "shithead" && <ShitheadRules />}
    </Card>
  );
};

export default GameRulesTab;

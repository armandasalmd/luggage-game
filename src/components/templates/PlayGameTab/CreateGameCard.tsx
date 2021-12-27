import { FC, useState } from "react";

import { Button, Card, Checkbox, Select } from "@components/atoms";
import * as DValues from "./dropdownValues";
import { ID } from "@utils/Types";
import PlayCircleOutline from "@material-ui/icons/PeopleAlt";

interface CreateGameCardProps {
  onCreateGame(gameOptions: any): void;
}

const CreateGameCard: FC<CreateGameCardProps> = (props) => {
  const [playerCount, setPlayerCount] = useState<ID>("2");
  const [gamePrice, setGamePrice] = useState<ID>("250");
  const [gameRules, setGameRules] = useState<ID>("classic");
  const [gameIsPrivate, setGameIsPrivate] = useState(false);

  function onCreateGame() {
    props.onCreateGame({
      playerCount: parseInt(playerCount.toString()),
      gamePrice: parseInt(gamePrice.toString()),
      isPrivate: gameIsPrivate,
      gameRules,
    });
  }

  return (
    <Card padded title="Create game">
      <div className="playGame__container">
        <div className="playGame__flexRow">
          <Select
            title="Players count"
            items={DValues.playersDropdown}
            idKey="key"
            textKey="value"
            placeholder="Select count"
            defaultSelectedId={playerCount}
            onChange={setPlayerCount}
            maxWidth="15rem"
          />
          <Select
            title="Game price"
            items={DValues.priceDropdown}
            idKey="key"
            textKey="value"
            placeholder="Select one value"
            defaultSelectedId={gamePrice}
            onChange={setGamePrice}
            maxWidth="15rem"
          />
          <Checkbox
            title="Game is private"
            value={gameIsPrivate}
            onCheck={setGameIsPrivate}
          />
        </div>
        <div className="playGame__flexRow">
          <Select
            title="Game rules mode"
            items={DValues.gameRulesDropdown}
            idKey="key"
            textKey="value"
            defaultSelectedId={gameRules}
            onChange={setGameRules}
          />
        </div>
        <div className="playGame__flexRow" style={{ marginTop: 16 }}>
          <Button
            onClick={onCreateGame}
            icon={<PlayCircleOutline />}
            type="ghost"
          >
            Start game
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CreateGameCard;

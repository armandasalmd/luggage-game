import { FC, useState } from "react";

import { Button, Card, Checkbox } from "@components/atoms";
import { GameRulesSelect, PriceSelect, PlayersSelect } from "@components/molecules";
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
    <Card title="Create game">
      <div className="playGame__container">
        <div className="playGame__flexRow">
          <PlayersSelect
            title="Players count"
            placeholder="Select count"
            defaultSelectedId={playerCount}
            onChange={setPlayerCount}
            maxWidth="15rem"
          />
          <PriceSelect
            title="Game price"
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
          <GameRulesSelect 
            title="Game rules mode"
            defaultSelectedId={gameRules}
            onChange={setGameRules}
            canPlayOnly
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

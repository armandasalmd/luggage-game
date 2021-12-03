import { FC } from "react";
import classNames from "classnames";
import "./PlayersController.scss";
import { randomCard } from "@utils/game/Card";
import { ILuggage } from "@utils/game/Player";
import { GamePlayer } from "@components/molecules";

interface PlayersControllerProps {
  className?: string | string[];
}

const PlayersController: FC<PlayersControllerProps> = (props) => {
  const classes = classNames("players", props.className);

  // TODO: This component will connect to redux store and manage the state
  const playerProps = {
    label: "Luggage",
    username: "klaidonsas"
  };

  const playerProps2 = {
    ...playerProps,
    active: true
  };

  const luggageProps: ILuggage = {
    downOne: randomCard(),
    downTwo: randomCard(),
    downThree: randomCard(),
    upOne: randomCard(),
    upThree: randomCard(),
  };

  return (
    <div className={classes}>
      <GamePlayer
        className="player1"
        playerProps={playerProps}
        luggageProps={luggageProps}
      />
      <GamePlayer
        className="player2"
        playerProps={playerProps2}
        luggageProps={luggageProps}
      />
      <GamePlayer
        className="player3"
        playerProps={playerProps}
        luggageProps={luggageProps}
      />
    </div>
  );
};

export default PlayersController;

import { FC } from "react";
import classNames from "classnames";
import "./GamePlayer.scss";
import PlayerCard, {
  PlayerCardProps,
} from "@components/atoms/PlayerCard/PlayerCard";
import MiniCardLuggage from "@components/molecules/MiniCardLuggage/MiniCardLuggage";
import { ILuggage } from "@utils/game/Player";

interface GamePlayerProps {
  playerProps: PlayerCardProps;
  luggageProps: ILuggage;
  className: string | string[];
}

const GamePlayer: FC<GamePlayerProps> = (props) => {
  const classes = classNames("gamePlayer", props.className);

  return (
    <div className={classes}>
      <PlayerCard {...props.playerProps} />
      <MiniCardLuggage
        className="gamePlayer__luggage"
        luggage={props.luggageProps}
      />
    </div>
  );
};

export default GamePlayer;

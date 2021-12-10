import { FC, useState } from "react";
import classNames from "classnames";
import "./GamePlayer.scss";
import PlayerCard, {
  PlayerCardProps,
} from "@components/atoms/PlayerCard/PlayerCard";
import { MiniCardLuggage, LuggageModal } from "@components/molecules";
import { ILuggage } from "@utils/game/Player";

interface GamePlayerProps {
  playerProps: PlayerCardProps;
  luggageProps: ILuggage | undefined;
  className: string | string[];
}

const GamePlayer: FC<GamePlayerProps> = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const classes = classNames("gamePlayer", props.className);

  function onLuggageClick() {
    setModalOpen(!modalOpen);
  }

  const playerProps = {
    ...props.playerProps,
    onLuggageClick: onLuggageClick,
  };

  return (
    <div className={classes}>
      <PlayerCard {...playerProps} />
      {props.luggageProps && (
        <MiniCardLuggage
          className="gamePlayer__luggage"
          luggage={props.luggageProps}
        />
      )}
      {props.luggageProps && (
        <LuggageModal
          isOpen={modalOpen}
          onClose={setModalOpen}
          username={props.playerProps.username}
          luggage={props.luggageProps}
        />
      )}
    </div>
  );
};

export default GamePlayer;

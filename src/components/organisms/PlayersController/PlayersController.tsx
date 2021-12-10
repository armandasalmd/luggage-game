import { FC } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import "./PlayersController.scss";
import { RootState } from "@redux/store";
import { PlayerCardProps } from "@components/atoms/PlayerCard/PlayerCard";
import { GamePlayer } from "@components/molecules";
import { toLuggageModel } from "@utils/game/Player";
import GlobalUtils from "@utils/Global";

interface PlayersControllerProps {
  className?: string | string[];
}

const PlayersController: FC<PlayersControllerProps> = (props) => {
  const classes = classNames("players", props.className);
  const players = useSelector((state: RootState) => state.game.playersState);
  const { activeSeatId } = useSelector((state: RootState) => state.game.gameDetails);

  if (!Array.isArray(players)) {
    return null;
  }

  const playerComponents = players.map(function (player, index) {
    const pProps: PlayerCardProps = {
      label: player.handCardCount + " " + GlobalUtils.pluralize("card", player.handCardCount) + " left",
      username: player.username,
      active: activeSeatId === player.seatId
    };
    const lProps = toLuggageModel(player.luggageCards);

    return <GamePlayer
      key={player.username}
      className={"player" + (index + 1).toString()}
      playerProps={pProps}
      luggageProps={lProps}
      />
  });

  return (
    <div className={classes}>
      {playerComponents}
    </div>
  );
};

export default PlayersController;

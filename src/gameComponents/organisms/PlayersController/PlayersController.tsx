import { FC } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import "./PlayersController.scss";

import { Card, ILuggage, IPublicPlayerState } from "@engine/index";
import { RootState } from "@redux/store";
import GlobalUtils from "@utils/Global";
import { PlayerCardProps } from "../../atoms";
import { Player } from "../../molecules";

function getPlayerLabel(player: IPublicPlayerState) {
  if (player.playerState === "playing") {
    return player.handCardCount + " " + GlobalUtils.pluralize("card", player.handCardCount) + " left";
  } else {
    return player.playerState + " place";
  }
}

interface PlayersControllerProps {
  className?: string | string[];
}

export const PlayersController: FC<PlayersControllerProps> = (props) => {
  const classes = classNames("playersController", props.className);
  let players = useSelector((state: RootState) => state.game.playersState);
  const { activeSeatId } = useSelector((state: RootState) => state.game.gameDetails);

  // TODO: remove when done
  function getLuggage(): ILuggage {
    const a = Card.fromString("3C");
    a.disabled = true;
    return {
      cardsDown: [
        Card.fromString("2D"),
        Card.fromString("3D"),
        Card.fromString("4D"),
      ],
      cardsUp: [
        Card.fromString("2C"),
        a,
        Card.fromString("4C"),
      ],
    };
  }

  players = [
    {
      seatId: 1,
      playerState: "playing",
      handCardCount: 0,
      playerId: "player1",
      username: "Armandas",
      avatar: "https://avatars0.githubusercontent.com/u/17098981?s=460&v=4",
    },
    {
      seatId: 2,
      playerState: "playing",
      handCardCount: 0,
      playerId: "player2",
      username: "Tadas lenkas",
      avatar: "https://avatars0.githubusercontent.com/u/17098981?s=460&v=4",
    },
    {
      seatId: 3,
      playerState: "playing",
      handCardCount: 0,
      playerId: "player3",
      username: "Modalena2",
      avatar: "https://avatars0.githubusercontent.com/u/17098981?s=460&v=4",
    },
    {
      seatId: 4,
      playerState: "playing",
      handCardCount: 0,
      playerId: "player4",
      username: "Jutavijas",
      avatar: "https://avatars0.githubusercontent.com/u/17098981?s=460&v=4",
    },
  ];

  if (!Array.isArray(players)) {
    return null;
  }

  const playerComponents = players.map(function (player, index) {
    const pProps: PlayerCardProps = {
      label: getPlayerLabel(player),
      username: player.username,
      active: activeSeatId === player.seatId
    };

    return <Player
      key={player.username}
      className={`player${index + 1}`}
      playerProps={pProps}
      luggageProps={getLuggage()}
      />
  });

  return (
    <div className={classes}>
      {playerComponents}
    </div>
  );
};

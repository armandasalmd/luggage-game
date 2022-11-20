import { FC, useEffect } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import "./PlayersController.scss";

import { IPublicPlayerState, toLuggageModel, GameStatus } from "@engine/index";
import { clearEmoji, receiveEmoji } from "@redux/actions";
import { RootState } from "@redux/store";
import { emojiListener } from "@socket/game";
import GlobalUtils from "@utils/Global";
import { PlayerCardProps } from "../../atoms";
import { Player } from "../../molecules";

function getPlayerLabel(player: IPublicPlayerState) {
  return `${player.handCardCount} ${GlobalUtils.pluralize("card", player.handCardCount)} left`;
}

interface PlayersControllerProps {
  className?: string | string[];
}

export const PlayersController: FC<PlayersControllerProps> = (props) => {
  const classes = classNames("playersController", props.className);
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.game.playersState);
  const { activeSeatId, status } = useSelector((state: RootState) => ({
    activeSeatId: state.game.gameDetails.activeSeatId,
    status: state.game.status,
  }));

  useEffect(() => {
    const emojiCleanup = emojiListener(function (emoji) {
      dispatch(receiveEmoji(emoji));
    });

    return () => {
      emojiCleanup();
    };
    // eslint-disable-next-line
  }, []);

  if (!Array.isArray(players)) return null;

  function postEmojiAnimation(username: string) {
    dispatch(clearEmoji(username));
  }

  const playerComponents = players.map(function (player, index) {
    const pProps: PlayerCardProps = {
      label: getPlayerLabel(player),
      extraLabel: status === GameStatus.Ended ? player.status + " place" : undefined,
      username: player.username,
      active: activeSeatId === player.seatId,
    };
    const classes = classNames(`player${index + 1} seat${player.seatId}`, {
      "disconnected": player.connected === false
    });

    if (player.connected === false) {
      pProps.extraLabel = "Disconnected";
    }

    return (
      <Player
        animatingEmoji={player.animatingEmoji}
        postEmojiAnimation={postEmojiAnimation.bind(null, player.username)}
        key={player.username}
        className={classes}
        playerProps={pProps}
        luggageProps={toLuggageModel(player.luggageCards)}
      />
    );
  });

  return <div className={classes}>{playerComponents}</div>;
};

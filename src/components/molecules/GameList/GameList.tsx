import { FC } from "react";

import "./GameList.scss";
import GameListItem, {
  IPublicGame,
} from "@components/atoms/GameListItem/GameListItem";
import { Empty } from "@components/atoms";

interface GameListProps {
  items: IPublicGame[];
  onItemClick(roomCode: string): void;
}

const GameList: FC<GameListProps> = (props) => {
  const items = props.items.map((item) => {
    return (
      <GameListItem
        game={item}
        onClick={(game) => props.onItemClick(game.roomId)}
        key={item.roomId}
      />
    );
  });

  if (items.length > 0) {
    return <div className="gameList">{items}</div>;
  } else {
    return <Empty text="No public lobbies found!" />;
  }
};

export default GameList;

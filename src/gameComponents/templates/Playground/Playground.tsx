import { FC, useState } from "react";
import "./Playground.scss";

import { PlayersController } from "../../organisms";
import { Hand } from "../../organisms/Hand/Hand";
import { Card } from "@engine/index";
import { GamePile } from "./GamePile";

export const Playground: FC = () => {
  const [destroying, setDestroying] = useState(false);

  function postDrop(cards: Card[]) {
    if (cards.map((o) => o.value).includes("10")) {
      setDestroying(true);
    }
  }

  return (
    <div className="playground">
      <GamePile
        className="playground__gamePile"
        destroying={destroying}
        setDestroying={setDestroying}
      />
      <Hand className="playground__hand" postDrop={postDrop} />
      <PlayersController />
    </div>
  );
};

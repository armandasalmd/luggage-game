import { FC, useState } from "react";
import "./Playground.scss";

import { PlayersController } from "../../organisms";
import { Hand } from "../../organisms/Hand/Hand";
import { GamePile } from "./GamePile";

export const Playground: FC = () => {
  const [destroying, setDestroying] = useState(false);

  function postDrop(shouldDestroy: boolean) {
    if (shouldDestroy) setDestroying(true);
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

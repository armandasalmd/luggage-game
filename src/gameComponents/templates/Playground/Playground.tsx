import { FC, useState } from "react";
import "./Playground.scss";

import { PlayersController } from "../../organisms";
import { Hand } from "../../organisms/Hand/Hand";
import { GamePile } from "./GamePile";

interface PlaygroundProps {
  setAnimating: (animating: boolean) => void;
}

export const Playground: FC<PlaygroundProps> = (props) => {
  const [destroying, setDestroying] = useState(false);

  function preDrop() {
    props.setAnimating(true);
  }

  function postDrop() {
    props.setAnimating(false);
  }

  function successDrop(shouldDestroy: boolean) {
    if (shouldDestroy) setDestroying(true);
  }

  return (
    <div className="playground">
      <GamePile
        className="playground__gamePile"
        destroying={destroying}
        setDestroying={setDestroying}
      />
      <Hand
        className="playground__hand"
        successDrop={successDrop}
        postDrop={postDrop}
        preDrop={preDrop}
      />
      <PlayersController />
    </div>
  );
};

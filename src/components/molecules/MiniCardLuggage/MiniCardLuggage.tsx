import { FC } from "react";
import classNames from "classnames";
import "./MiniCardLuggage.scss";
import { MiniGameCard } from "@components/atoms";
import { ILuggage } from "@utils/game/Player";
import { ACard, CardFace } from "@utils/game/Card";

export interface MiniCardLuggageProps {
  luggage: ILuggage;
  className?: string | string[];
}

const MiniCardLuggage: FC<MiniCardLuggageProps> = ({ luggage, className }) => {
  const classes = classNames("miniLuggage", className);

  function toSomeFace(card: ACard | undefined, face: CardFace): ACard | undefined {
    if (card == null || card.face === face) {
      return card;
    } else {
      return {
        ...(card as ACard),
        face,
      };
    }
  }

  const toDownFace = (card: ACard | undefined) => toSomeFace(card, CardFace.DownFace);
  const toUpFace = (card: ACard | undefined) => toSomeFace(card, CardFace.UpFace);

  luggage.downOne = toDownFace(luggage.downOne);
  luggage.downTwo = toDownFace(luggage.downTwo);
  luggage.downThree = toDownFace(luggage.downThree);
  luggage.upOne = toUpFace(luggage.upOne);
  luggage.upTwo = toUpFace(luggage.upTwo);
  luggage.upThree = toUpFace(luggage.upThree);

  return (
    <div className={classes}>
      <div className="miniLuggage__faceDown">
        <MiniGameCard
          invisible={!luggage.downOne}
          card={luggage.downOne}
          colorType="primary"
        />
        <MiniGameCard
          invisible={!luggage.downTwo}
          card={luggage.downTwo}
          colorType="primary"
        />
        <MiniGameCard
          invisible={!luggage.downThree}
          card={luggage.downThree}
          colorType="primary"
        />
      </div>
      <div className="miniLuggage__faceUp">
        <MiniGameCard
          invisible={!luggage.upOne}
          card={luggage.upOne}
          colorType="secondary"
        />
        <MiniGameCard
          invisible={!luggage.upTwo}
          card={luggage.upTwo}
          colorType="secondary"
        />
        <MiniGameCard
          invisible={!luggage.upThree}
          card={luggage.upThree}
          colorType="secondary"
        />
      </div>
    </div>
  );
};

export default MiniCardLuggage;

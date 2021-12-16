import { FC } from "react";
import classNames from "classnames";

import "./MiniCardLuggage.scss";
import { MiniGameCard, message } from "@components/atoms";
import { ILuggage } from "@utils/game/Player";
import { ACard, CardFace } from "@utils/game/Card";
import GlobalUtils from "@utils/Global";

export interface MiniCardLuggageProps {
  luggage: ILuggage;
  className?: string | string[];
  onClick?(card: ACard): void;
}

const MiniCardLuggage: FC<MiniCardLuggageProps> = (props) => {
  const { luggage, className, onClick } = props;
  const classes = classNames("miniLuggage", className);
  const clickable = typeof onClick === "function";

  function toSomeFace(
    card: ACard | undefined,
    face: CardFace
  ): ACard | undefined {
    if (card == null || card.face === face) {
      return card;
    } else {
      return {
        ...(card as ACard),
        face,
      };
    }
  }

  const toDownFace = (card: ACard | undefined) =>
    toSomeFace(card, CardFace.DownFace);
  const toUpFace = (card: ACard | undefined) =>
    toSomeFace(card, CardFace.UpFace);

  luggage.downOne = toDownFace(luggage.downOne);
  luggage.downTwo = toDownFace(luggage.downTwo);
  luggage.downThree = toDownFace(luggage.downThree);
  luggage.upOne = toUpFace(luggage.upOne);
  luggage.upTwo = toUpFace(luggage.upTwo);
  luggage.upThree = toUpFace(luggage.upThree);

  const onClickUp = clickable ? props.onClick : undefined;

  const canPlayDown =
    !luggage.upOne?.value && !luggage.upTwo?.value && !luggage.upThree?.value;

  function onClickDownImpl(card: ACard) {
    message.information("Hidden card was " + card.value);
    GlobalUtils.callIfFunction(props.onClick, card);
  }

  const onClickDown = clickable && canPlayDown ? onClickDownImpl : undefined;

  return (
    <div className={classes}>
      <div className="miniLuggage__faceDown">
        <MiniGameCard
          invisible={!luggage.downOne?.value}
          card={luggage.downOne}
          colorType="primary"
          onClick={onClickDown}
        />
        <MiniGameCard
          invisible={!luggage.downTwo?.value}
          card={luggage.downTwo}
          colorType="primary"
          onClick={onClickDown}
        />
        <MiniGameCard
          invisible={!luggage.downThree?.value}
          card={luggage.downThree}
          colorType="primary"
          onClick={onClickDown}
        />
      </div>
      <div className="miniLuggage__faceUp">
        <MiniGameCard
          invisible={!luggage.upOne?.value}
          card={luggage.upOne}
          colorType="secondary"
          onClick={onClickUp}
        />
        <MiniGameCard
          invisible={!luggage.upTwo?.value}
          card={luggage.upTwo}
          colorType="secondary"
          onClick={onClickUp}
        />
        <MiniGameCard
          invisible={!luggage.upThree?.value}
          card={luggage.upThree}
          colorType="secondary"
          onClick={onClickUp}
        />
      </div>
    </div>
  );
};

export default MiniCardLuggage;

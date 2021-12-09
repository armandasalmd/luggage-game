import { FC } from "react";
import classNames from "classnames";
import "./GamePile.scss";
import { GameCard } from "@components/atoms";
import { ACard, CardFace, CardKind } from "@utils/game/Card";
import { useDrop } from "react-dnd";
import { ItemTypes, DropPayload } from "@utils/game/Drag";
import GlobalUtils from "@utils/Global";
import { stringToCard } from "@utils/game/Card";

interface GamePileProps {
  cardsLeft: number;
  visibleCard?: string;
}

const GamePile: FC<GamePileProps> = (props) => {
  
  function onDrop(aa: DropPayload) {
    console.log("DROPPED", aa);
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.Card,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), []);

  const classesLeft = classNames("gamePile__left", {
    "gamePile__left--hidden": props.cardsLeft <= 0,
  });

  const classesRight = classNames("gamePile__right", {
    "gamePile__right--empty": !props.visibleCard,
    "gamePile__right--active": isOver
  });

  const cardDown: ACard = {
    kind: CardKind.Clubs,
    value: "2",
    face: CardFace.DownFace,
  };

  const label = `${props.cardsLeft} ${GlobalUtils.pluralize("card", props.cardsLeft)} left`;
  const card: ACard = stringToCard(props.visibleCard || "2C");

  return (
    <div className="gamePile">
      <div className={classesLeft}>
        <GameCard card={cardDown} />
        <p className="gamePile__label">{label}</p>
      </div>
      <div className={classesRight} id="gamePile__right" ref={drop}>
        {props.visibleCard && <GameCard card={card} />}
        {!props.visibleCard && <p>Stack empty</p>}
      </div>
    </div>
  );
};

export default GamePile;

import { FC } from "react";
import "./MiniCardLuggage.scss";
import { ACard, CardFace } from "@utils/game/Card";
import { MiniGameCard } from "@components/atoms";

interface MiniCardLuggageProps {
  faceUpCards: ACard[];
  faceDownCards: ACard[];
}

const MiniCardLuggage: FC<MiniCardLuggageProps> = (props) => {
  return (
    <div className="miniLuggage">
      <div className="miniLuggage__faceDown">
        {props.faceDownCards.map(function (card, index) {
          card.face = CardFace.DownFace;
          return <MiniGameCard card={card} key={index} colorType="primary" />;
        })}
      </div>
      <div className="miniLuggage__faceUp">
        {props.faceUpCards.map(function (card, index) {
          card.face = CardFace.UpFace;
          return <MiniGameCard card={card} key={index} colorType="secondary" />;
        })}
      </div>
    </div>
  );
};

export default MiniCardLuggage;

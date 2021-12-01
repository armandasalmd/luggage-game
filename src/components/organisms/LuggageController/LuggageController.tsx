import { FC } from "react";
import { MiniCardLuggage } from "@components/molecules";
import { randomCard } from "@utils/game/Card";

const LuggageController: FC = () => {
  const faceUpCards = [randomCard(), randomCard()];
  const faceDownCards = [randomCard(), randomCard(), randomCard()];

  return (
    <div className="luggageController" style={{display: "flex", alignItems: "center", gap: 12}}>
      <p>Luggage |</p>
      <MiniCardLuggage
        faceUpCards={faceUpCards}
        faceDownCards={faceDownCards}
      />
    </div>
  );
};

export default LuggageController;

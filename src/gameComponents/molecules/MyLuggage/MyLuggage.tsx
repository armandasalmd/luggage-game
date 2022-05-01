import { FC, useState } from "react";

import "./MyLuggage.scss";
import { Card, ILuggage } from "@engine/index";
import { MiniLuggage } from "..";
import { ActionButton } from "../../atoms";
import { MiniLuggageModal } from "..";
import LuggageIcon from "./LuggageIcon";

function getLuggage(): ILuggage {
  const a = Card.fromString("3C");
  a.disabled = true;
  return {
    cardsDown: [
      Card.fromString("2D"),
      Card.fromString("3D"),
      Card.fromString("4D"),
    ],
    cardsUp: [
      Card.fromString("2C"),
      a,
      Card.fromString("4C"),
    ],
  };
}

export const MyLuggage: FC = () => {
  const [mobileLuggageOpen, setMobileLuggageOpen] = useState(false);
  const luggageEnabled = true; // get info from redux store
  const myLuggage = getLuggage();

  function onClick(card: Card) {
    console.log(card.toString());
  }

  function onDown() {
    const cover: any = document.querySelector("#screen-cover");
    // Open only if cover is not in use already
    if (cover && cover.style.display === "none") {
      setMobileLuggageOpen(true)
    }
  }

  function onUp() {
    if (mobileLuggageOpen) {
      setMobileLuggageOpen(false);
    }
  }

  return <div className="myLuggage">
    <div className="myLuggage__main">
      {luggageEnabled && <MiniLuggage onClick={onClick} luggage={myLuggage} />}
    </div>
    <div className="myLuggage__mobile">
      <ActionButton icon={<LuggageIcon />} onDown={onDown} onUp={onUp} />
      {mobileLuggageOpen && <MiniLuggageModal luggage={myLuggage} username="Armandas (You)" />}
    </div>
  </div>
};

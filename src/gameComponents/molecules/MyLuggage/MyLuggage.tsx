import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MyLuggage.scss";

import { Card, toLuggageModel, luggageTime } from "@engine/index";
import { MiniLuggage, MiniLuggageModal } from "..";
import { ActionButton } from "../../atoms";
import LuggageIcon from "./LuggageIcon";
import { RootState } from "@redux/store";
import { takeLuggageAsync } from "@socket/game";
import { pickLuggageCard } from "@redux/actions";

interface MyLuggageProps {
  onOpenning: () => void;
}

export const MyLuggage: FC<MyLuggageProps> = (props) => {
  const dispatch = useDispatch();
  const [mobileLuggageOpen, setMobileLuggageOpen] = useState(false);
  const { myLuggage, username, isLuggageTime } = useSelector((state: RootState) => ({
    myLuggage: toLuggageModel(state.game.myState.luggageCards),
    username: state.user.user.username,
    isLuggageTime: luggageTime(state.game),
  }));

  function onClick(card: Card) {
    if (isLuggageTime) {
      takeLuggageAsync(card.toString()).then((result) => {
        if (result.success) {
          dispatch(pickLuggageCard(card.toString()));
        }
      });
    }
  }

  function onDown() {
    const cover: any = document.querySelector("#screen-cover");
    // Open only if cover is not in use already
    if (cover && cover.style.display !== "block") {
      props.onOpenning();
      setMobileLuggageOpen(true);
    }
  }

  function onUp() {
    if (mobileLuggageOpen) {
      setMobileLuggageOpen(false);
    }
  }

  return <div className="myLuggage">
    <div className="myLuggage__main">
      <MiniLuggage onClick={onClick} luggage={myLuggage} />
    </div>
    <div className="myLuggage__mobile">
      <ActionButton icon={<LuggageIcon />} onDown={onDown} onUp={onUp} />
      {(mobileLuggageOpen || isLuggageTime) && <MiniLuggageModal luggage={myLuggage} username={`${username} (You)`} onClick={onClick} />}
    </div>
  </div>
};

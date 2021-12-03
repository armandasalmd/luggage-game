import { FC } from "react";
import "./FinishedPile.scss";
import GlobalUtils from "@utils/Global";

interface FinishedPileProps {
  cardCount: number;
}

const FinishedPile: FC<FinishedPileProps> = ({ cardCount }) => {
  return (
    <div className="finishedPile">
      <img
        alt="pile"
        src="/assets/blue_back_rotated.png"
        width="202"
        height="130"
      />
      <p>
        {`${cardCount} ${GlobalUtils.pluralize("card", cardCount)} finished`}
      </p>
    </div>
  );
};

export default FinishedPile;

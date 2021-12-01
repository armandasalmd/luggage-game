import { FC } from "react";
import "./GameActionBar.scss";
import { LuggageController } from "..";

const GameActionBar: FC = () => {
  return (
    <div className="actionBar">
      <div className="actionBar__luggage">
        <LuggageController />
      </div>
      <div className="actionBar__action">
        <p>Action controller component</p>
      </div>
    </div>
  );
};

export default GameActionBar;

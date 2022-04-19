import { FC } from "react";
import "./GameLayout.scss";
import { ActionBar, GameNavbar } from "../../organisms";
import { Playground } from "../Playground/Playground";

interface GameLayoutProps {
  onSurrender(): void;
}

export const GameLayout: FC<GameLayoutProps> = (props) => {
  return (
    <div className="layout">
      <GameNavbar
        gamePrice={100}
        name={"Armandas"}
        onSurrender={props.onSurrender}
      />
      <Playground />
      <ActionBar />
    </div>
  );
};

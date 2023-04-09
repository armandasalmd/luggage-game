import { FC, useState } from "react";
import { useSelector } from "react-redux";
import "./GameLayout.scss";

import { RootState } from "@redux/store";
import { ActionBar, PostGameActionBar, GameNavbar } from "../../organisms";
import { Playground } from "../Playground/Playground";
import { GameStatus } from "@engine/index";
import { useFinishTurn } from "@engine/hooks/useFinishTurn";

interface GameLayoutProps {
  onSurrender(): void;
}

export const GameLayout: FC<GameLayoutProps> = (props) => {
  const [handAnimating, setHandAnimating] = useState(false);
  const finishTurn = useFinishTurn();
  const { username, price, rules, coins, status } = useSelector(
    (state: RootState) => ({
      coins: state.user.coins,
      username: state.user.user.username,
      price: state.game.gameDetails.price,
      rules: state.game.gameDetails.rules,
      status: state.game.status,
    })
  );

  return (
    <div className="layout">
      <GameNavbar
        gamePrice={price}
        gameRules={rules}
        name={username}
        coins={coins}
        onSurrender={props.onSurrender}
        canSurrender={status === GameStatus.Running}
      />
      <Playground setAnimating={setHandAnimating} />
      {status === GameStatus.Ended && <PostGameActionBar />}
      {status === GameStatus.Running && (
        <ActionBar handAnimating={handAnimating} onSubmitTurn={finishTurn} />
      )}
    </div>
  );
};

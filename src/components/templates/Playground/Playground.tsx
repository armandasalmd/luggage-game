import { FC } from "react";
import { useSelector } from "react-redux";

import "./Playground.scss";
import { RootState } from "@redux/store";
import { FinishedPile, GamePile, GameHand } from "@components/molecules";
import { PlayersController } from "@components/organisms";
import { randomCard, ACard } from "@utils/game/Card";
import { IGameState } from "@utils/game/IGameState";

const Playground: FC = () => {
  const gameState: IGameState = useSelector((state: RootState) => state.game);

  // TODO: This component will connect to redux store and manage the state
  const cards: ACard[] = [
    randomCard(),
    randomCard(),
    randomCard(),
    randomCard(),
    randomCard(),
    randomCard(),
    randomCard(),
    randomCard(),
    randomCard(),
  ];

  return (
    <div className="playground">
      <div className="playground__finished">
        <FinishedPile cardCount={gameState.gameDetails.deadCardsCount} />
      </div>
      <div className="playground__gamePile">
        <GamePile
          cardsLeft={gameState.gameDetails.sourceCardsCount}
          visibleCard={gameState.gameDetails.topPlayCard}
        />
      </div>
      <div className="playground__gameHand">
        <GameHand cards={cards} />
      </div>
      <PlayersController />
    </div>
  );
};

export default Playground;

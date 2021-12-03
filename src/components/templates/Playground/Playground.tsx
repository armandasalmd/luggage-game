import { FC } from "react";
import { FinishedPile, GamePile, GameHand } from "@components/molecules";
import { PlayersController } from "@components/organisms";
import "./Playground.scss";
import { randomCard, ACard } from "@utils/game/Card";

const Playground: FC = () => {
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
        <FinishedPile cardCount={32} />
      </div>
      <div className="playground__gamePile">
        <GamePile cardsLeft={12} visibleCard={randomCard()} />
      </div>
      <div className="playground__gameHand">
        <GameHand cards={cards} />
      </div>
      <PlayersController />
    </div>
  );
};

export default Playground;

import "./GameRulesTab.scss";
import { Card } from "@components/atoms";

const GameRulesTab = () => {
  return <Card className="gameRules">
    <h3 className="gameRules__title">The rules for luggage game</h3>
    <p className="gameRules__sectionLabel">Game preparation state:</p>
    <p className="gameRules__text">The card deck must be first shuffled. Card shuffler hands out 3 face down cards in front of every player. Next step, card shuffler puts 3 face up cards on every face down card. Lastly, each player gets 3 cards to take to their hands. Game is ready  to start.</p>
    <p className="gameRules__sectionLabel">Game winner:</p>
    <p className="gameRules__text">First player to finish all of the cards in front of them (3 face down, 3 face up) wins the game. The last player to finish all of the cards looses.</p>
    <p className="gameRules__sectionLabel">How to play:</p>
    <p className="gameRules__text">Put the rest of the cards in the middle so everyone can access it. Also, reveal the first card, which will begin the game. First player starts to the right to the card dealer. Game goes clockwise, each player puts their card/cards during their turn and draw another card (minimum 3 cards are required in their hand). Kind of the card does not matter in this game.</p>
    <p className="gameRules__text">The main game rule is to put higher card during your turn. For example, if pile top card ir 9, you should put higher card such as J, Q, K, A etc. An exception is made for power cards. Power cards can be put anytime and they have special meaning as well. If player cannot beat during it’s turn, he takes the pile to it’s hand.</p>
    <p className="gameRules__sectionLabel">Special cards:</p>
    <p className="gameRules__text">
      In classical game special cards are 2, 5 and 10.
    </p>
    <ul className="gameRules__list">
      <li>2 means that you can put it anytime and it’s next player’s turn</li>
      <li>5 means that you can put it anytime and then put any other card</li>
      <li>10 means that you can put it anytime and the current pile is eliminated from the game (put aside) </li>
    </ul>
  </Card>;
};

export default GameRulesTab;

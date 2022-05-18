import { FC } from "react";
import { batch, useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import {
  Card,
  convertCards,
  GameRulesType,
  moveCardElementsToPile,
} from "@engine/index";
import { MyDeck } from "..";
import GlobalUtils from "@utils/Global";
import { RootState } from "@redux/store";
import { getEngine } from "@engine/index";
import { playCardsAsync } from "@socket/game";
import { setHandCards, appendToSubmitQueue, appendToPlayDeck, updateMyState } from "@redux/actions"

interface HandProps {
  className?: string;
  postDrop?: (shouldDestroy: boolean) => void;
}

export const Hand: FC<HandProps> = (props) => {
  const dispatch = useDispatch();
  const classes = classNames("hand", props.className);
  const { handCards, submitQueue, playDeck } = useSelector(
    (state: RootState) => ({
      handCards: state.game.myState.handCards,
      submitQueue: state.game.myState.submitQueue,
      playDeck: state.game.gameDetails.playDeck,
    })
  );
  const engine = getEngine(GameRulesType.Classic);
  
  async function onDropAsync(cardsDropped: Card[]): Promise<boolean> {
    if (!engine.canPlayCards(playDeck, submitQueue, cardsDropped.map(o => o.toString()))) {
      return false; // returns back to hand
    }

    const result = await playCardsAsync(cardsDropped.map(c => c.toString()));

    if (result.success) {
      if (!moveCardElementsToPile(cardsDropped)) return false;

      const stringCards = cardsDropped.map((c) => c.toString());
      const shouldDestroy = engine.shouldDestroy(submitQueue, stringCards); // must be before batch
      // Remove submitted cards, no sorting needed
      batch(() => {
        dispatch(setHandCards(handCards.filter(c => !stringCards.includes(c.toString()))));
        dispatch(appendToPlayDeck(stringCards));
        dispatch(appendToSubmitQueue(stringCards));

        if (result.myPlayerState) { // When top luggage is taken
          dispatch(updateMyState(result.myPlayerState));
        }
      });

      GlobalUtils.callIfFunction(props.postDrop, shouldDestroy);
      
      return true;
    }

    return false;
  }

  return (
    <div className={classes}>
      <MyDeck
        cards={convertCards(handCards)}
        canDropFn={() => true}
        onDropAsync={onDropAsync}
      />
    </div>
  );
};

import { PlayerState, IReduxGameState } from "@engine/index";

export function getPlayerStatusLabel(status: PlayerState) {
  let label = "Surrender win";

  if (status === PlayerState.Surrendered) {
    label = "You surrendered";
  } else if (status) {
    label = status + " place";
  }

  return label;
}

export function luggageTime(state: IReduxGameState) {
  return (
    state.myState.handCards.length === 0 &&
    state.myState.luggageCards.endsWith(",,,") &&
    state.myState.luggageCards !== (",,,,,") &&
    state.myState.seatId === state.gameDetails.activeSeatId
  );
}

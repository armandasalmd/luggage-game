import { useDispatch } from "react-redux";
import { finishTurnAsync } from "@socket/game";
import { updateMyState } from "@redux/actions";
import { message } from "@components/atoms";

export function useFinishTurn() {
  const dispatch = useDispatch();
  
  function submit() {
    finishTurnAsync().then((result) => {
      if (result.success) {
        dispatch(updateMyState(result.myPlayerState));
      } else if (result.message) {
        message.error(result.message);
      }
    });
  }

  return submit;
}
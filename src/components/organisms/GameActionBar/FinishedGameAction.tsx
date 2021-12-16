import { FC } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "@components/atoms";
import RouteUtils from "@utils/Route";
import { clearGameState } from "@redux/actions";

interface FinishedGameActionProps {
  playerState: string;
  reward: number;
}

const FinishedGameAction: FC<FinishedGameActionProps> = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const label =
    props.reward > 0
      ? `You won ${props.reward} coins`
      : `You lost ${-props.reward} coins`;
  const place =
    props.playerState === "playing"
      ? "Last place"
      : props.playerState + " place";

  function onQuit() {
    history.replace(RouteUtils.routes.app.main.dashboard.path);
    dispatch(clearGameState());
  }

  return (
    <div
      className="actionBar__action"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <p>
        {label} ({place})
      </p>
      <Button type="ghost" onClick={onQuit}>
        Quit game
      </Button>
    </div>
  );
};

export default FinishedGameAction;

import { FC } from "react";
import PickCountAction from "./PickCountAction";

import { Button } from "@components/atoms";
import HomeIcon from "@material-ui/icons/PostAdd";
import CheckIcon from "@material-ui/icons/Check";

export interface ActionBarActionProps {
  active: boolean;
  pickPlayCountItems: number[];
  hasLastMove: boolean;
  onPickCount(pick: number): void;
  onFinishTurn(): void;
}

const ActionBarAction: FC<ActionBarActionProps> = (props) => {
  function actionTemplate(icon: any, buttonText: string, cb: () => void) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <p>Play a card</p>
        <p>|</p>
        <Button
          tall
          tightX
          onClick={cb}
          type="ghost"
          icon={icon}
        >
          {buttonText}
        </Button>
      </div>
    );
  }

  if (!props.active) {
    return <p>Wait for your turn</p>;
  } else if (props.pickPlayCountItems.length > 1) {
    return (
      <PickCountAction
        pickOptions={props.pickPlayCountItems}
        onSelect={props.onPickCount}
      />
    );
  } else if (props.hasLastMove) {
    return actionTemplate(<CheckIcon />, "Finish", props.onFinishTurn);
  } else {
    return actionTemplate(<HomeIcon />, "Take home", props.onFinishTurn);
  }
};

export default ActionBarAction;

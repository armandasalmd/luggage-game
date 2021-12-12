import { FC } from "react";

import { Button } from "@components/atoms";
import CheckIcon from "@material-ui/icons/Check";

interface PlayOrFinishActionProps {
  onFinish(): void;
}

const PlayOrFinishAction: FC<PlayOrFinishActionProps> = (props) => {
  return (
    <div style={{display: "flex", alignItems: "center", gap: 8}}>
      <p style={{fontSize: 18}}>Play a card</p>
      <p>|</p>
      <Button tall tightX onClick={props.onFinish} type="ghost" icon={<CheckIcon />}>Finish</Button>
    </div>
  );
};

export default PlayOrFinishAction;

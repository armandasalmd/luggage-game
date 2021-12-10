import { FC } from "react";

import { Button } from "@components/atoms";
import DownIcon from "@material-ui/icons/ArrowDownward";

interface PlayOrFinishActionProps {
  onFinish(): void;
}

const PlayOrFinishAction: FC<PlayOrFinishActionProps> = (props) => {
  return (
    <div style={{display: "flex", alignItems: "center", gap: 8}}>
      <p style={{fontSize: 18}}>Play a card</p>
      <p>|</p>
      <Button tall tightX onClick={props.onFinish} type="danger" icon={<DownIcon />}>Take home</Button>
    </div>
  );
};

export default PlayOrFinishAction;

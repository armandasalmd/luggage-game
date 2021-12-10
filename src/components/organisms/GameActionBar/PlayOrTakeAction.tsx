import { FC } from "react";

import { Button } from "@components/atoms";
import HomeIcon from "@material-ui/icons/PostAdd";

interface PlayOrTakeActionProps {
  onTake(): void;
}

const PlayOrTakeAction: FC<PlayOrTakeActionProps> = (props) => {
  return (
    <div style={{display: "flex", alignItems: "center", gap: 8}}>
      <p style={{fontSize: 18}}>Play a card</p>
      <p>|</p>
      <Button tall tightX onClick={props.onTake} type="ghost" icon={<HomeIcon />}>Take home</Button>
    </div>
  );
};

export default PlayOrTakeAction;

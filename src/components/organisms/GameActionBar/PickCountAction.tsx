import { FC } from "react";

import { Button } from "@components/atoms";
import AddIcon from "@material-ui/icons/Add";

interface PickCountActionProps {
  pickOptions: number[];
  onSelect(pick: number): void;
}

const PickCountAction: FC<PickCountActionProps> = (props) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {props.pickOptions.map(function (pick) {
        return (
          <Button
            tightX
            tall
            onClick={() => props.onSelect(pick)}
            type="ghost"
            icon={<AddIcon />}
            bigText
          >
            {pick}
          </Button>
        );
      })}
    </div>
  );
};

export default PickCountAction;

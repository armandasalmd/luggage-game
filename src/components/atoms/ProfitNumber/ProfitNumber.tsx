import { FC } from "react";

import UpIcon from "@material-ui/icons/ArrowDropUp";
import DownIcon from "@material-ui/icons/ArrowDropDown";

interface ProfitNumberProps {
  value: number;
}

const ProfitNumber: FC<ProfitNumberProps> = (props) => {
  const text = props.value < 0 ? -props.value : props.value;
  const icon =
    props.value < 0 ? (
      <DownIcon htmlColor="var(--secondary-color)" />
    ) : (
      <UpIcon htmlColor="var(--primary-color)" />
    );
  const color = props.value < 0 ? "var(--secondary-color)" : "var(--primary-color)";

  return (
    <div style={{display: "flex"}}>
      {icon}
      <p style={{color, alignSelf: "center"}}>{text.toString()}</p>
    </div>
  );
};

export default ProfitNumber;

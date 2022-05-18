import { FC } from "react";
import classNames from "classnames";
import "./ProfitNumber.scss";

import UpIcon from "@material-ui/icons/ArrowDropUp";
import DownIcon from "@material-ui/icons/ArrowDropDown";

interface ProfitNumberProps {
  value: number;
}

const ProfitNumber: FC<ProfitNumberProps> = (props) => {
  const classes = classNames("profit", {
    "profit--negative": props.value < 0,
  });

  const text = props.value < 0 ? -props.value : props.value;
  const icon =
    props.value < 0 ? (
      <DownIcon htmlColor="var(--secondary-color)" />
    ) : (
      <UpIcon htmlColor="var(--primary-color)" />
    );

  return (
    <div className={classes}>
      {icon}
      <p>{text}</p>
    </div>
  );
};

export default ProfitNumber;

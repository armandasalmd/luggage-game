import { FC } from "react";
import Select, { SelectProps } from "@components/atoms/Select/Select";

type OmitedProps = "items" | "idKey" | "textKey";

export const rulesDropdown = [
  {
    key: "classic",
    value: "Classic (2, 5, 10 powercards)",
    canPlay: true,
  },
  {
    key: "classicAnyOfSameKind",
    value: "Classic (put any of same kind)",
    canPlay: false,
  },
  {
    key: "morePowerCards",
    value: "More powercards (3, 7, 8 added)",
    canPlay: false,
  },
  {
    key: "shithead",
    value: "Shithead rules",
    canPlay: false,
  },
];

interface GameRulesSelectProps extends Omit<SelectProps, OmitedProps> {
  canPlayOnly?: boolean;
}

const GameRulesSelect: FC<GameRulesSelectProps> = (props) => {
  const items =
    props.canPlayOnly === true
      ? rulesDropdown.filter((item) => item.canPlay)
      : rulesDropdown;

  return <Select {...props} idKey="key" textKey="value" items={items} />;
};

export default GameRulesSelect;

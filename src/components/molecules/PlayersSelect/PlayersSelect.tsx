import { FC } from "react";
import Select, { SelectProps } from "@components/atoms/Select/Select";

type OmitedProps = "items" | "idKey" | "textKey";

export const playersDropdown = [
  {
    key: 2,
    value: "2 players",
  },
  {
    key: 3,
    value: "3 players",
  },
  {
    key: 4,
    value: "4 players",
  },
  {
    key: 5,
    value: "5 players",
  },
];

interface PlayersSelectProps extends Omit<SelectProps, OmitedProps> {}

const PlayersSelect: FC<PlayersSelectProps> = (props) => {
  return <Select {...props} idKey="key" textKey="value" items={playersDropdown} />;
};

export default PlayersSelect;

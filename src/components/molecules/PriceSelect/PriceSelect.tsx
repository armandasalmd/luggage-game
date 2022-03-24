import { FC } from "react";
import Select, { SelectProps } from "@components/atoms/Select/Select";

type OmitedProps = "items" | "idKey" | "textKey";

export const priceDropdown = [
  {
    key: 0,
    value: "No cost",
  },
  {
    key: 100,
    value: "100 coins",
  },
  {
    key: 250,
    value: "250 coins",
  },
  {
    key: 500,
    value: "500 coins",
  },
  {
    key: 1000,
    value: "1K coins",
  },
  {
    key: 2500,
    value: "2.5K coins",
  },
  {
    key: 5000,
    value: "5K coins",
  },
  {
    key: 10000,
    value: "10K coins",
  },
];

interface PriceSelectProps extends Omit<SelectProps, OmitedProps> {
  enableAny?: boolean;
}

const PriceSelect: FC<PriceSelectProps> = (props) => {
  const items = props.enableAny ? [
    {
      key: -1,
      value: "Any price",
    },
    ...priceDropdown
  ] : priceDropdown;

  return <Select {...props} idKey="key" textKey="value" items={items} />;
};

export default PriceSelect;

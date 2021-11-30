import { FC, ReactElement, useState } from "react";
import { ColorType } from "@utils/Types";
import { VerticalMenuItem } from "@components/atoms";

export interface VerticalMenuProps {
  colorType?: ColorType;
  onSelectChange?(id: number | string, item: object): void;
  idKey: string;
  textKey: string;
  items: any[];
  defaultSelectedId?: string | number;
}

const VerticalMenu: FC<VerticalMenuProps> = (props) => {
  const [ selectedItemId, setSelectedItemId ] = useState(props.defaultSelectedId);
  let menuItems: ReactElement[] = [];

  function onItemClick(id: number) {
    if (selectedItemId !== id) {
      setSelectedItemId(id);
      
      if (typeof props.onSelectChange === "function") {
        props.onSelectChange(id, props.items.find(function (item) {
          return item[props.idKey] === id;
        }));
      }
    }
  }

  for (const item of props.items) {
    menuItems.push(
      <VerticalMenuItem
        id={item[props.idKey]}
        key={item[props.idKey]}
        text={item[props.textKey]}
        colorType={props.colorType}
        selected={selectedItemId === item[props.idKey]}
        onClick={onItemClick}
      />
    );
  }

  return <div className="verticalMenu">{menuItems}</div>;
};

export default VerticalMenu;

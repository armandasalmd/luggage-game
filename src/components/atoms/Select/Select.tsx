import { FC, ReactElement, useState } from "react";
import classNames from "classnames";
import "./Select.scss";

interface SelectProps {
  title?: string;
  description?: string;
  placeholder?: string;
  idKey: string;
  textKey: string;
  items: any[];
  defaultSelectedId?: string | number;
  onSelectChange?(id: number | string, item: object): void;
  maxWidth?: string | number;
  fullWidth?: boolean;
}

const NOT_SELECTED = "not_selected";

const Select: FC<SelectProps> = (props) => {
  const [ selectedItemId, setSelectedItemId ] = useState(props.defaultSelectedId || NOT_SELECTED);
  const classes = classNames("select", {
    "select--fullWidth": props.fullWidth
  });
  let menuItems: ReactElement[] = [];

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedItemId(e.target.value);
      
    if (typeof props.onSelectChange === "function") {
      props.onSelectChange(e.target.value, props.items.find(function (item) {
        return item[props.idKey].toString() === e.target.value;
      }));
    }
  }
  
  menuItems.push(<option value={NOT_SELECTED} key={NOT_SELECTED} disabled hidden>{props.placeholder || "Select value..."}</option>);

  for (const item of props.items) {
    menuItems.push(
      <option
        value={item[props.idKey]}
        key={item[props.idKey]}
      >{item[props.textKey]}</option>
    );
  }

  return (
    <div className={classes}>
      { props.title && <p className="select__title">{props.title}</p> }
      { props.description && <p className="select__description">{props.description}</p> }
      <select onChange={onChange} value={selectedItemId} style={{maxWidth: props.maxWidth}}>
        {menuItems}
      </select>
    </div>
  );
};

export default Select;

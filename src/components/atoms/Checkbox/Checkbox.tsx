import { FC } from "react";
import "./Checkbox.scss";
import CheckBoxTrueIcon from "@material-ui/icons/CheckBox";
import CheckBoxFalseIcon from "@material-ui/icons/CheckBoxOutlineBlank";

interface CheckboxProps {
  onCheck?(newValue: boolean): void;
  title?: string;
  value: boolean;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  let checkboxId = "checkbox-" + Math.round(Math.random() * 10000);

  function onCheck() {
    if (typeof props.onCheck === "function") {
      props.onCheck(!props.value);
    }
  }

  return (
    <div className="checkbox">
      <label htmlFor={checkboxId} className="checkbox__text">
        {props.title}
      </label>
      {props.value ? (
        <CheckBoxTrueIcon className="checkbox__checkTrue" onClick={onCheck} />
      ) : (
        <CheckBoxFalseIcon className="checkbox__checkFalse" onClick={onCheck} />
      )}
    </div>
  );
};

export default Checkbox;

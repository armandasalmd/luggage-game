import { FC, useState } from "react";
import classNames from "classnames";
import "./Input.scss";

type InputType = "warning" | "error";

interface InputProps {
  icon?: any;
  type?: InputType;
  value?: string;
  title?: string;
  description?: string;
  placeholder?: string;
  style?: object;
  tall?: boolean;
  maxWidth?: string | number;
}

const Input: FC<InputProps> = (props) => {
  const classes = classNames("input", {
    [`input--${props.type}`]: props.type,
    "input--tall": props.tall
  });

  let [value, setValue] = useState(props.value || "");

  return (
    <div className={classes} style={props.style}>
      {props.icon && <div className="input__icon">{props.icon}</div>}
      {props.title && <p className="input__title">{props.title}</p>}
      {props.description && <p className="input__description">{props.description}</p>}
      <input
        className={classes}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        placeholder={props.placeholder || "Enter value"}
        style={{maxWidth: props.maxWidth}}
      />
    </div>
  );
};

export default Input;

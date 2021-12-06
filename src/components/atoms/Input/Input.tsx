import { FC } from "react";
import classNames from "classnames";
import GlobalUtils from "@utils/Global";
import "./Input.scss";

type InputType = "warning" | "error";

interface InputProps {
  icon?: any;
  type?: InputType;
  value?: string;
  setValue?(value: string): void;
  title?: string;
  error?: string;
  placeholder?: string;
  style?: object;
  tall?: boolean;
  maxWidth?: string | number;
  password?: boolean;
}

const Input: FC<InputProps> = (props) => {
  const classes = classNames("input", {
    [`input--${props.type}`]: props.type,
    "input--tall": props.tall
  });

  function setValue(value: string) {
    GlobalUtils.callIfFunction(props.setValue, value);
  }

  return (
    <div className={classes} style={props.style}>
      {props.icon && <div className="input__icon">{props.icon}</div>}
      {props.title && <p className="input__title">{props.title}</p>}
      {props.error && <p className="input__error">{props.error}</p>}
      <input
        type={props.password ? "password" : "text"}
        className={classes}
        value={props.value || ""}
        onChange={({ target }) => setValue(target.value)}
        placeholder={props.placeholder || "Enter value"}
        style={{maxWidth: props.maxWidth}}
      />
    </div>
  );
};

export default Input;

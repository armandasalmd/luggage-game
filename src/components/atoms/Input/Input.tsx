import { FC } from "react";
import classNames from "classnames";
import GlobalUtils from "@utils/Global";
import "./Input.scss";

type InputType = "warning" | "error";

interface InputProps {
  className?: string;
  error?: string;
  icon?: any;
  placeholder?: string;
  setValue?(value: string): void;
  style?: object;
  maxWidth?: string | number;
  name?: string;
  onSubmit?(): void;
  password?: boolean;
  tall?: boolean;
  title?: string;
  type?: InputType;
  value?: string;
}

const Input: FC<InputProps> = (props) => {
  const classes = classNames("input", {
    [`input--${props.type}`]: props.type,
    "input--tall": props.tall,
    "input--error": props.error
  }, props.className);

  function setValue(value: string) {
    GlobalUtils.callIfFunction(props.setValue, value);
  }

  function onKeyUp(event: any) {
    // Enter key capture
    if (event.keyCode === 13) {
      event.preventDefault();
      GlobalUtils.callIfFunction(props.onSubmit);
    }
  }

  return (
    <div className={classes} style={props.style}>
      {props.icon && <div className="input__icon">{props.icon}</div>}
      {props.title && <p className="input__title">{props.title}</p>}
      {props.error && <p className="input__error">{props.error}</p>}
      <input
        name={props.name}
        type={props.password ? "password" : "text"}
        value={props.value || ""}
        onChange={({ target }) => setValue(target.value)}
        placeholder={props.placeholder || "Enter value"}
        style={{maxWidth: props.maxWidth}}
        onKeyUp={props.onSubmit === undefined ? undefined : onKeyUp}
      />
    </div>
  );
};

export default Input;

import { FC } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import Constants from "@utils/Constants";
import "./Message.scss";
import { CheckCircle, Info, Warning, Error } from "@material-ui/icons";

const MESSAGE_TIME = 5000;

export type MessageType = "error" | "warning" | "information" | "success";
export type AlignType = "left" | "center" | "right";

interface MessageProps {
  message: string;
  type: MessageType;
  align?: AlignType;
}

const Message: FC<MessageProps> = (props) => {
  const classes = classNames("message", {
    [`message--${props.align}`]: !!props.align,
    [`message--${props.type}`]: true,
  });

  const icons = {
    error: <Error className="message__icon" />,
    warning: <Warning className="message__icon" />,
    information: <Info className="message__icon" />,
    success: <CheckCircle className="message__icon" />,
  };

  return (
    <div className={classes}>
      <div className="message__container">
        {icons[props.type]}
        <p className="message__text">{props.message}</p>
      </div>
    </div>
  );
};

function messageImpl(message: string, type: MessageType, align?: AlignType) {
  let elem = document.getElementById("message");

  if (!elem) {
    elem = document.createElement("div");
    elem.id = "message";

    document.getElementById("root")?.appendChild(elem);
  }

  ReactDOM.render(
    <Message message={message} type={type} align={align} />,
    elem
  );

  setTimeout(() => {
    if (elem) {
      ReactDOM.unmountComponentAtNode(elem);
    }
  }, MESSAGE_TIME);
}

const items = {
  message: messageImpl,
  success: (message: string) => messageImpl(message, "success"),
  error: (message?: string) => messageImpl(message || Constants.defaultErrorMessage, "error"),
  warning: (message: string) => messageImpl(message, "warning"),
  information: (message: string) => messageImpl(message, "information"),
};

export default items;

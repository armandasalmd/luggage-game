import { FC, SyntheticEvent, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "@redux/store";
import classNames from "classnames";
import "./Modal.scss";
import CloseIcon from "@material-ui/icons/Close";
import GlobalUtils from "@utils/Global";

interface ModalProps {
  flyInAnimation?: boolean;
  fullScreen?: boolean;
  isOpen: boolean;
  onClose?(state: boolean): void;
  noPadding?: boolean;
  title: string;
}

const Modal: FC<ModalProps> = (props) => {
  function removeModalContainer() {
    const container = document.getElementById("modal-container");

    if (container) {
      container.classList.remove("modal-container");
      ReactDOM.unmountComponentAtNode(container);
    }
  }

  useEffect(() => {
    function onClose() {
      GlobalUtils.callIfFunction(props.onClose, false);
    }

    const classes = classNames("modal__window", {
      "modal__window--fullScreen": props.fullScreen,
      "modal__window--flyInBottom": props.flyInAnimation,
      "modal__window--paddless": props.noPadding,
    });

    function preventBubble(e: SyntheticEvent) {
      e.stopPropagation();
    }

    const modal = (
      <div className="modal" onClick={onClose}>
        <div className={classes} onClick={preventBubble}>
          <div className="modal__header">
            <h1 className="modal__title">{props.title}</h1>
            <CloseIcon className="modal__close" onClick={onClose} />
          </div>
          <Provider store={store}>
            <div className="modal__body">{props.children}</div>
          </Provider>
        </div>
      </div>
    );

    if (props.isOpen) {
      const container = document.getElementById("modal-container");
      container?.classList.add("modal-container");
      ReactDOM.render(modal, document.getElementById("modal-container"));
    } else {
      removeModalContainer();
    }
  }, [props]);

  return null;
};

export default Modal;

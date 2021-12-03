import { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import "./Modal.scss";
import CloseIcon from "@material-ui/icons/Close";
import GlobalUtils from "@utils/Global";

interface ModalProps {
  isOpen: boolean;
  onClose?(state: boolean): void;
  flyInAnimation?: boolean;
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
      "modal__window--flyInBottom": props.flyInAnimation,
    });

    const modal = (
      <div className="modal">
        <div className={classes}>
          <div className="modal__header">
            <h1 className="modal__title">{props.title}</h1>
            <CloseIcon className="modal__close" onClick={onClose} />
          </div>
          <div className="modal__body">{props.children}</div>
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

  return <div></div>;
};

export default Modal;

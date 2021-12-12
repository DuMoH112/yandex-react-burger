import { useEffect, FC } from "react";
import ReactDOM from "react-dom";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import stylesModal from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot: any  = document.getElementById("modalRoot");

interface IProps {
  header: string;
  onClick: () => void;
}

const Modal: FC<IProps> = (props) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        props.onClick();
      }
    };

    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [props]);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={props.onClick}>
      <div
        className={`${stylesModal.root}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={stylesModal.header}>
          {props.header && (
            <h2 className="text_type_main-medium">{props.header}</h2>
          )}
          <button className={stylesModal.closeButton} onClick={props.onClick}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {props.children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;

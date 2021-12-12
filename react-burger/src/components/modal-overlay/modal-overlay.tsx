import { FC } from "react";

import stylesModalOverlay from "./modal-overlay.module.css";

interface IProps {
  onClick: () => void;
}

const ModalOverlay: FC<IProps> = (props) => {
  return (
    <div className={stylesModalOverlay.root} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default ModalOverlay;

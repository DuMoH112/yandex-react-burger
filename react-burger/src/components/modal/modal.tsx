import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesModal from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById("modalRoot");


function Modal(props) {
  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        props.onClick()
      }
    };

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [props]);

  return ReactDOM.createPortal((
    <ModalOverlay onClick={props.onClick}>
      <div className={`${stylesModal.root}`} onClick={e => e.stopPropagation()}>
        <div className={stylesModal.header}>
          { props.header && <h2 className="text_type_main-medium">{props.header}</h2>}
          <button className={stylesModal.closeButton} onClick={props.onClick}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {props.children}
      </div>
    </ModalOverlay>
  ), modalRoot);
};

Modal.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
}

export default Modal;

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import stylesModalOverlay from './modal-overlay.module.css';

const modalRoot = document.getElementById("modalRoot") as HTMLElement;


function ModalOverlay(props: any) {
    return ReactDOM.createPortal((
        <div className={stylesModalOverlay.root} onClick={props.onClick}>
            {props.children} 
        </div>
    ), modalRoot);
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ModalOverlay;

import React from 'react';
import PropTypes from 'prop-types';

import stylesModalOverlay from './modal-overlay.module.css';


function ModalOverlay(props: any) {
    return (
        <div className={stylesModalOverlay.root} onClick={props.onClick}>
            {props.children} 
        </div>
    );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ModalOverlay;

import React from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesBurgerItem from './burger-ingredients-item.module.css';
import { item } from '../../utils/types';
import { useDrag } from 'react-dnd';

function BurgerIngredientsItem(props) {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: props.item
  });
  return (
    <>
      <li ref={dragRef} key={props.item._id} className={`${stylesBurgerItem.card} mb-8`} onClick={() => props.openModal(props.item)}>
        <img src={props.item.image} alt=""/>
        <span className={`${stylesBurgerItem.price} mt-2 mb-1 text_type_digits-default`}>
          {props.item.price}
          <CurrencyIcon type="primary" />
        </span>
        <p className={`${stylesBurgerItem.name} text_type_main-default`}>{props.item.name}</p>
      </li>
    </>
  );
};

BurgerIngredientsItem.propTypes = {
  item: item.isRequired,
  openModal: PropTypes.func.isRequired
};

export default BurgerIngredientsItem;

import React from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesBurgerItem from './burger-ingredients-item.module.css';
import { item } from '../../utils/types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

function BurgerIngredientsItem(props) {
  const ingredients = useSelector(store => store.burgerIngredients.constructorIngredients).filter(item => item._id === props.item._id);
  const currentBun = [useSelector(store => store.burgerIngredients.currentBun)].filter(item => item && item._id === props.item._id)

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: props.item
  });
  
  const conditionCount = ingredients.length > 0 || currentBun.length > 0;
  const length = props.item.type !== 'bun' ? ingredients.length : currentBun.length > 0 ? 2 : 0;

  return (
    <>
      <li ref={dragRef} key={props.item._id} className={`${stylesBurgerItem.card} mb-8 mr-4`} onClick={() => props.openModal(props.item)}>
        {
          conditionCount && (
            <span className={`${stylesBurgerItem.count} text_type_digits-default`}>{length}</span>
          )
        }
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

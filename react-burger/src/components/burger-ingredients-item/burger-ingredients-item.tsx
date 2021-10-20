import React from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesBurgerItem from './burger-ingredients-item.module.css';
import { data } from '../../utils/types'

function BurgerIngredientsItems(props: any) {
  return (
    <>
      <ul className={`${stylesBurgerItem.card_container} pl-4 pr-2`}>
        {
          props.data.map((item: any) => (
            <li key={item._id} className={`${stylesBurgerItem.card} mb-8`}>
              <img src={item.image} alt=""/>
              <span className={`${stylesBurgerItem.price} mt-2 mb-1 text_type_digits-default`}>
                {item.price}
                <CurrencyIcon type="primary" />
              </span>
              <p className={`${stylesBurgerItem.name} text_type_main-default`}>{item.name}</p>
            </li>
          ))
        }
      </ul>
    </>
  );
};

BurgerIngredientsItems.propTypes = {
  data: data.isRequired
};

export default BurgerIngredientsItems;

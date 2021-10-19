import React from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import stylesBurgerItem from './burger-ingredients-item.module.css';

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
}

BurgerIngredientsItems.propTypes = { 
  data: PropTypes.arrayOf(PropTypes.shape({  
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  })),
};

export default BurgerIngredientsItems;

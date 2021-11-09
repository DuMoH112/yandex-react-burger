import { useDispatch, useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

import { 
  ConstructorElement, 
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import styleBurgerConstructor from './burger-constructor.module.css';
import { 
  getOrderNumber,
  ADD_INGREDIENT_TO_CONSTRUCTOR, 
  ADD_BUN_TO_CONSTRUCTOR
} from '../../services/actions/ingredients'

function BurgerConstructor(props) {
  const dispatch = useDispatch();
  const { 
    constructorIngredients,
    currentBun
  } = useSelector(store => store.burgerIngredients)

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (item.type === 'bun') {
        dispatch({
          type: ADD_BUN_TO_CONSTRUCTOR,
          draggedIngredient: item
        });
      }
      else {
        dispatch({
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          draggedIngredient: item
        });
      }
    }
  });

  const totalPrice = useSelector(store => store.burgerIngredients.constructorIngredients).reduce((sum, { price }) => {
    return sum + price
  }, 0) + (currentBun ? currentBun.price * 2 : 0);

  const topElement = useMemo(() => {
    return currentBun ? (
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${currentBun.name} (верх)`}
        price={currentBun.price}
        thumbnail={currentBun.image}
      />
    ) : ''
  }, [currentBun]);

  const bottomElement = useMemo(() => {
    return currentBun ? (
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${currentBun.name} (низ)`}
        price={currentBun.price}
        thumbnail={currentBun.image}
      />
    ) : ''
  }, [currentBun]);

  return (
    <section className={styleBurgerConstructor.root}>
      <div ref={dropTarget} className={`${styleBurgerConstructor.list} `}>
        <div className={`${styleBurgerConstructor.item} mb-4`}>
          {topElement}
        </div>
        <div className={`${styleBurgerConstructor.scrollable} mb-4`}>
        {
          constructorIngredients.map((item, index) => (
              <BurgerConstructorItem item={item} key={index} index={index}/>
            )
          )
        }
        </div>
        <div className={`${styleBurgerConstructor.item} mb-4`}>
          {bottomElement}
        </div>
      </div>
      <div className={`${styleBurgerConstructor.total} mt-10`}>
        <span className={`${styleBurgerConstructor.totalSum} mr-10 text_type_digits-medium`}>
          {totalPrice} 
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="large" onClick={() => {
          if (currentBun != null && constructorIngredients.length > 0) {
            dispatch(getOrderNumber([currentBun, ...constructorIngredients, currentBun]));
            props.openModal()
          } 
        }}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  openModal: PropTypes.func.isRequired
};

export default BurgerConstructor;

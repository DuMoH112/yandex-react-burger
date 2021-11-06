import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { 
  ConstructorElement, 
  CurrencyIcon,
  DragIcon, 
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import styleBurgerConstructor from './burger-constructor.module.css';
import { useSelector } from 'react-redux';


function BurgerConstructor(props) {
  const { 
    constructorIngredients,
    currentBun
  } = useSelector(store => store.burgerIngredients)

  const totalPrice = useMemo(() => {
    let result = 0
    constructorIngredients.slice(1, -1).forEach((element) => {
      if (element.type !== "bun")
        result += element.price
    });

    if (currentBun)
      result += (currentBun.price * 2);

    return result ? result : 0
  }, [constructorIngredients, currentBun]);

  const topElement = useMemo(() => {
    return currentBun.length == 0 ? (
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
    return currentBun.length == 0 ? (
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
      <div className={`${styleBurgerConstructor.list} `}>
        <div className={`${styleBurgerConstructor.item} mb-4`}>
          {topElement}
        </div>
        <div className={`${styleBurgerConstructor.scrollable} mb-4`}>
          {
            constructorIngredients.slice(1, -1).filter(item => item.type !== "bun").map((item) => (
              <div className={`${styleBurgerConstructor.item} mb-4`} key={item.name}>
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </div>
            ))
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
        <Button type="primary" size="large" onClick={() => props.openModal()}>
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

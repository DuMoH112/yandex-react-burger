import React, {useMemo, useState} from 'react';
import PropTypes from 'prop-types';

import { 
  ConstructorElement, 
  CurrencyIcon,
  DragIcon, 
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import styleBurgerConstructor from './burger-constructor.module.css';


const BurgerConstructor = (props: any) => {
  const [currentBun, setCurrentBun] = useState(props.constructorElements[0]);

  const totalPrice = useMemo(() => {
    let result = 0
    props.constructorElements.forEach((element: any) => {
      result += element.price
    });
    return result
  }, [props.constructorElements]);

  const topElement = useMemo(() => {
    return (
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${currentBun.name} (вверх)`}
        price={currentBun.price}
        thumbnail={currentBun.image}
      />
    )
  }, [currentBun]);

  const bottomElement = useMemo(() => {
    return (
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${currentBun.name} (низ)`}
        price={currentBun.price}
        thumbnail={currentBun.image}
      />
    )
  }, [currentBun]);

  return (
    <section className={styleBurgerConstructor.root}>
      <div className={`${styleBurgerConstructor.list} `}>
        <div className={`${styleBurgerConstructor.item} mb-4`}>
          {topElement}
        </div>
        <div className={`${styleBurgerConstructor.scrollable} mb-4`}>
          {
            props.constructorElements.slice(1, -1).map((item: any) => 
              {
                return (
                  <div className={`${styleBurgerConstructor.item} mb-4`} key={item.name}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      isLocked={false}
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </div>
            )})
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
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  constructorElements: PropTypes.arrayOf(PropTypes.shape({  
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

export default BurgerConstructor;

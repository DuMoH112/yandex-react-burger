import React from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItems from '../burger-ingredients-item/burger-ingredients-item';
import stylesBurgerIngredients from './burger-ingredients.module.css';

function BurgerIngredients(props: any) {
  const tabs = [
    {
      name: 'bun',
      title: 'Булки',
    },
    {
      name: 'sauce',
      title: 'Соусы',
    },
    {
      name: 'main',
      title: 'Начинки',
    },
  ]
  
  const [current, setCurrent] = React.useState(tabs[0].name);

  return (
    <section>
      <h1 className={`text_type_main-large`}>Соберите бургер</h1>
      <div className={stylesBurgerIngredients.selection_header} style={{ display: 'flex' }}>
        {
          tabs.map((tab) => (
            <Tab 
              onClick={setCurrent} 
              active={current === tab.name} 
              value={tab.name} 
              key={tab.name}
            >
              {tab.title}
            </Tab>
          ))
        }
      </div>
      <BurgerIngredientsItems
        data={props.ingredients.filter((el: any) => el.type === current)}
      />
    </section>
  );
}

BurgerIngredients.propTypes = { 
  ingredients: PropTypes.arrayOf(PropTypes.shape({  
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
  }))
};

export default BurgerIngredients;

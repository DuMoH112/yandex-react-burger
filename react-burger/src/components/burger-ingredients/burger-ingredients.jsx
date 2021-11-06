import React from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import stylesBurgerIngredients from './burger-ingredients.module.css';
import { useSelector } from 'react-redux';


function BurgerIngredients(props) {
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
  const ingredients = useSelector(store => store.burgerIngredients.ingredients);

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
      <ul className={`${stylesBurgerIngredients.card_container} pl-4 pr-2`}>
        {
          ingredients.filter((el) => el.type === current).map((item) => (
            <BurgerIngredientsItem
              key={item._id}
              item={item}
              openModal={props.openModal}
            />
          ))
        }
        
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  openModal: PropTypes.func
};

export default BurgerIngredients;

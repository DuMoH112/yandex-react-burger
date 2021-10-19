import React from 'react';

import '@ya.praktikum/react-developer-burger-ui-components';

import stylesApp from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { data } from '../../utils/data';

function App() {
  return (
    <div className={stylesApp.root}>
      <AppHeader />
      <div className={stylesApp.container}> 
        <BurgerIngredients ingredients={data}/>
        <BurgerConstructor constructorElements={data}/>
      </div>
    </div>
  );
}

export default App;

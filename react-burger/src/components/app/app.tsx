import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { data } from '../../utils/data';

function App() {
  return (
    <div>
      <AppHeader />
      <BurgerIngredients ingredients={data}/>
    </div>
  );
}

export default App;

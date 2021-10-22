import React, {useEffect, useState} from 'react';

import '@ya.praktikum/react-developer-burger-ui-components';

import stylesApp from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {
  const [state, setState] = useState({ 
    productData: [],
    loading: true
  });

  const productData = async () => {
    setState({...state, loading: true});
    const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
    const data = await res.json();
    if (data.success)
      setState({ productData: data.data, loading: false });
  };

  useEffect(() => {
    productData();
  }, []);

  return (
    <div className={stylesApp.root}>
      <AppHeader />
      <div className={stylesApp.container}> 
        <BurgerIngredients ingredients={state.productData}/>
        <BurgerConstructor constructorElements={state.productData}/>
      </div>
    </div>
  );
}

export default App;

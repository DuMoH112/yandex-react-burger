import React, {useEffect, useState} from 'react';

import '@ya.praktikum/react-developer-burger-ui-components';

import stylesApp from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';


function App() {
  const [isOpenOrder, setIsOpenOrder] = React.useState(false);
  const [isOpenIngredient, setIsOpenIngredient] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});

  const [state, setState] = useState({ 
    productData: [],
    loading: true
  });

  const productData = async () => {
    setState({...state, loading: true});
    const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
    const data = await res.json();
    setState({ productData: data.data, loading: false });
  };

  useEffect(() => {
    productData();
  }, []);

  const closeIngredientModal = () => {
    setIsOpenIngredient(false);
    setCurrentIngredient({});
  };

  const openIngredientModal = (item: any) => {
    setCurrentIngredient({...item});
    setIsOpenIngredient(true);
  };

  const closeOrderModal = () => {
    setIsOpenOrder(false);
  };

  const openOrderModal = () => {
    setIsOpenOrder(true);
  };

  return (
    <div className={stylesApp.root}>
      <AppHeader />
      {state.loading && 'Загрузка...'}
      {
        !state.loading && 
        <div className={stylesApp.container}> 
          <BurgerIngredients ingredients={state.productData} openModal={openIngredientModal}/>
          <BurgerConstructor constructorElements={state.productData} openModal={openOrderModal}/>
          { isOpenIngredient && 
            (
                <Modal onClick={closeIngredientModal} header="Детали ингредиента">
                  <div>aaa</div>
                </Modal>
            )
          }
          { isOpenOrder && 
            (
                <Modal onClick={closeOrderModal} header="">
                  <div>aaa</div>
                </Modal>
            )
          }
        </div>
      }
    </div>
  );
}

export default App;

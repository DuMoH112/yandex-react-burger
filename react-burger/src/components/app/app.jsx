import React, {useEffect, useState} from 'react';

import '@ya.praktikum/react-developer-burger-ui-components';

import stylesApp from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

const URL_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [isOpenOrder, setIsOpenOrder] = React.useState(false);
  const [isOpenIngredient, setIsOpenIngredient] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});

  const [state, setState] = useState({ 
    productData: [],
    loading: true
  });

  const getProductData = async () => {
    setState({...state, loading: true});
    const res = await fetch(URL_INGREDIENTS);
    const data = await res.json();
    setState({ productData: data.data, loading: false });
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        if(isOpenIngredient) {
          setIsOpenIngredient(false)
        }
        else if(isOpenOrder) {
          setIsOpenOrder(false);
        }
      }
    }

    window.addEventListener('keydown', close);

    return () => window.removeEventListener('keydown', close);

  },[isOpenIngredient, isOpenOrder]);

  const closeIngredientModal = () => {
    setIsOpenIngredient(false);
    setCurrentIngredient({});
  };

  const openIngredientModal = (item) => {
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
      {state.loading && <div className={`${stylesApp.loader} text_type_main-medium`}>Загрузка...</div>}
      {
        !state.loading && 
        <div className={stylesApp.container}> 
          <BurgerIngredients ingredients={state.productData} openModal={openIngredientModal}/>
          <BurgerConstructor constructorElements={state.productData} openModal={openOrderModal}/>
          { isOpenIngredient && 
            (
                <Modal onClick={closeIngredientModal} header="Детали ингредиента">
                  <IngredientDetails currentIngredient={currentIngredient}/>
                </Modal>
            )
          }
          { isOpenOrder && 
            (
                <Modal onClick={closeOrderModal} header="">
                  <OrderDetails />
                </Modal>
            )
          }
        </div>
      }
    </div>
  );
}

export default App;

import React, {useEffect, useState} from 'react';

import '@ya.praktikum/react-developer-burger-ui-components';

import stylesApp from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

import { useDispatch } from 'react-redux';
import { 
  getIngredients,
  SET_CURRENT_INGREDIENT,
  DELETE_CURRENT_INGREDIENT
} from '../../services/actions/ingredients';

function App() {
  const dispatch = useDispatch();

  const [isOpenOrder, setIsOpenOrder] = React.useState(false);
  const [isOpenIngredient, setIsOpenIngredient] = React.useState(false);
  const [statusLoading, setStatusLoading] = useState({ 
    isLoading: true,
    isError: false
  });

  useEffect(() => {
    setStatusLoading({ isLoading: true, isError: false });
    try {
      dispatch(getIngredients());
      setStatusLoading({ isLoading: false, isError: false });
    } catch (error) {
      setStatusLoading({ isLoading: false, isError: true });
    }
  }, [dispatch]);

  const openIngredientModal = (item) => {
    dispatch({type: SET_CURRENT_INGREDIENT, currentIngredient: item});
    setIsOpenIngredient(true);
  };

  const openOrderModal = () => {
    setIsOpenOrder(true);
  };

  const closeModal = () => {
    setIsOpenIngredient(false);
    setIsOpenOrder(false);
    dispatch({type: DELETE_CURRENT_INGREDIENT});
  };

  return (
    <div className={stylesApp.root}>
      <AppHeader />
      {statusLoading.isLoading && !statusLoading.isError && <div className={`${stylesApp.loader} text_type_main-medium`}>Загрузка...</div>}
      {statusLoading.isError && !statusLoading.isLoading && <div className={`${stylesApp.loader} text_type_main-medium`}>Упс! Что-то пошло не так =(</div>}
      {
        !statusLoading.isLoading && 
        !statusLoading.isError &&
        <div className={stylesApp.container}> 
          <BurgerIngredients openModal={openIngredientModal}/>
          <BurgerConstructor openModal={openOrderModal}/>
          { isOpenIngredient && 
            (
                <Modal onClick={closeModal} header="Детали ингредиента">
                  <IngredientDetails />
                </Modal>
            )
          }
          { isOpenOrder && 
            (
                <Modal onClick={closeModal} header="">
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

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import styles from "./app.module.css";
import "@ya.praktikum/react-developer-burger-ui-components";

import {
  HomePage,
  LoginPage,
  RegistrationPage,
  FrogotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  NotFound404,
  PlugPage,
} from "../../pages";
import { refreshToken } from "../../services/actions/user";
import { getCookie } from "../../services/cookies";
import RequireAuth from "../require-auth";

import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

import {
  DELETE_CURRENT_INGREDIENT,
  getIngredients,
} from "../../services/actions/ingredients";
import {
  closeOrderModal,
  closeIngredientModal,
  openIngredientModal,
} from "../../services/actions/modal";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpenModalOrder, isOpenModalIngredient } = useSelector(
    (store) => store.modal
  );
  const { isRequesting, isFailed } = useSelector(
    (store) => store.burgerIngredients
  );

  const isHaveCookie =
    getCookie("isOpenIngredientModal") === "true" ? true : false;
  const isHaveRefreshToken = Boolean(getCookie("refreshToken"));

  useEffect(() => {
    dispatch(getIngredients());
    if (isHaveRefreshToken) dispatch(refreshToken());
  }, [dispatch, isHaveRefreshToken]);

  useEffect(() => {
    if (isHaveCookie) dispatch(openIngredientModal());
  }, [dispatch, isHaveCookie]);

  const closeModal = useCallback(() => {
    dispatch(closeOrderModal());
    dispatch(closeIngredientModal());
    dispatch({ type: DELETE_CURRENT_INGREDIENT });
    if (location.pathname !== "/") navigate(-1);
  }, [dispatch, navigate, location.pathname]);

  const background = location.state && location.state.background;
  return (
    <div className={styles.root}>
      <AppHeader />
      {isRequesting && !isFailed && (
        <div className={`${styles.loader} text_type_main-medium`}>
          Загрузка...
        </div>
      )}
      {isFailed && !isRequesting && (
        <div className={`${styles.loader} text_type_main-medium`}>
          Упс! Что-то пошло не так =(
        </div>
      )}
      {!isRequesting && !isFailed && (
        <div className={styles.container}>
          <Routes location={background || location}>
            <Route path="/" exact={true} element={<HomePage />} />
            <Route
              path="ingredients/:id"
              exact={true}
              element={<IngredientDetails />}
            />
            <Route path="/login" exact={true} element={<LoginPage />} />
            <Route
              path="/register"
              exact={true}
              element={<RegistrationPage />}
            />
            <Route
              path="/forgot-password"
              exact={true}
              element={<FrogotPasswordPage />}
            />
            <Route
              path="/reset-password"
              exact={true}
              element={<ResetPasswordPage />}
            />
            <Route path="/orders" exact={true} element={<PlugPage />} />
            <Route element={<RequireAuth />}>
              <Route path="/profile" exact={true} element={<ProfilePage />} />
              <Route
                path="/profile/orders"
                exact={true}
                element={<PlugPage />}
              />
              <Route
                path="/profile/orders/:id"
                exact={true}
                element={<PlugPage />}
              />
            </Route>
            <Route path="*" exact={true} element={<NotFound404 />} />
          </Routes>

          {/* Show the modal when a `backgroundLocation` is set */}
          {isOpenModalIngredient && background && (
            <Routes>
              <Route
                path="ingredients/:id"
                exact={true}
                element={
                  <Modal onClick={closeModal} header="Детали ингредиента">
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
          {isOpenModalOrder && (
            <Modal onClick={closeModal} header="">
              <OrderDetails />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}

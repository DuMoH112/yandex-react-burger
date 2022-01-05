import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";

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
  FeedPage,
  NotFound404,
} from "../../pages";
import { refreshToken } from "../../services/actions/user";
import { getCookie } from "../../services/cookies";
import RequireAuth from "../require-auth";

import AppHeader from "../app-header/app-header";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderItemDetails from "../order-item-details/order-item-details";

import {
  CLEAR_ORDER_NUMBER_SUCCESS,
  DELETE_CURRENT_INGREDIENT,
  getIngredients,
} from "../../services/actions/ingredients";
import {
  closeOrderModal,
  closeIngredientModal,
  openIngredientModal,
  closeOrderDetailsModal,
} from "../../services/actions/modal";

import { ORDER_DELETE_CURRENT_ORDER } from "../../services/actions/orders";

import { IBurgerIngredients } from "../../utils/interfaces";
import { Loader } from "../loader/loader";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isRequesting, isFailed } = useSelector(
    (store) => store.burgerIngredients && store.user
  );

  const { ingredients } = useSelector(
    (store: { burgerIngredients: IBurgerIngredients }) =>
      store.burgerIngredients
  );

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length]);

  // ------------Refresh access token------------
  const isHaveRefreshToken = Boolean(getCookie("refreshToken"));
  useEffect(() => {
    if (isHaveRefreshToken) dispatch(refreshToken());
  }, [dispatch, isHaveRefreshToken]);
  // --------------------------------------------

  // -Open openIngredientModal after reload page-
  const isHaveCookie =
    getCookie("isOpenIngredientModal") === "true" ? true : false;
  useEffect(() => {
    if (isHaveCookie) dispatch(openIngredientModal());
  }, [dispatch, isHaveCookie]);
  // --------------------------------------------

  // -------------Close modal window-------------
  const { isOpenModalOrder, isOpenModalIngredient, isOpenModalOrderDetails } =
    useSelector((store) => store.modal);
  const closeModal = useCallback(() => {
    if (isOpenModalIngredient) {
      dispatch(closeIngredientModal());
      dispatch({ type: DELETE_CURRENT_INGREDIENT });
    }
    if (isOpenModalOrderDetails) {
      dispatch(closeOrderDetailsModal());
      dispatch({ type: ORDER_DELETE_CURRENT_ORDER });
    }
    if (isOpenModalOrder) {
      dispatch(closeOrderModal());
      dispatch({ type: CLEAR_ORDER_NUMBER_SUCCESS });
    }
    if (location.pathname !== "/") navigate(-1);
  }, [
    dispatch,
    navigate,
    location.pathname,
    isOpenModalIngredient,
    isOpenModalOrderDetails,
    isOpenModalOrder,
  ]);
  // --------------------------------------------

  switch (location.pathname.split("/")[1]) {
    case "profile":
    case "feed":
      location.state = isOpenModalOrderDetails ? location.state : null;
      break;
    default:
      break;
  }
  let background = location.state && location.state.background;
  return (
    <div className={styles.root}>
      <AppHeader />
      {isRequesting && !isFailed && (
        <div className={`${styles.loader} text_type_main-medium`}>
          <Loader />
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
            <Route path="/" element={<HomePage />} />
            <Route path="/ingredients/:id" element={<IngredientDetails />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/forgot-password" element={<FrogotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/feed/:id" element={<OrderItemDetails />} />
            <Route element={<RequireAuth />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/orders" element={<ProfilePage />} />
              <Route
                path="/profile/orders/:id"
                element={<OrderItemDetails />}
              />
            </Route>
            <Route path="*" element={<NotFound404 />} />
          </Routes>

          {/* Show the modal when a `backgroundLocation` is set */}
          {(isOpenModalIngredient || isOpenModalOrderDetails) && background && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={
                  <Modal onClick={closeModal} header="Детали ингредиента">
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path="/feed/:id"
                element={
                  <Modal
                    onClick={closeModal}
                    header={`#${location.state.header}`}
                    header_style={"text_type_digits-default"}
                  >
                    <OrderItemDetails />
                  </Modal>
                }
              />
              <Route
                path="/profile/orders/:id"
                element={
                  <Modal
                    onClick={closeModal}
                    header={`#${location.state.header}`}
                    header_style={"text_type_digits-default"}
                  >
                    <OrderItemDetails />
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
};

export default App;

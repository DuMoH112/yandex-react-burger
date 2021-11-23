import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import styles from "./home.module.css";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export function HomePage() {
  const location = useLocation();
  const { isOpenModalOrder, isOpenModalIngredient } = useSelector(
    (store) => store.modal
  );

  return (
    <>
      {(isOpenModalIngredient ||
        isOpenModalOrder ||
        location.pathname === "/") && (
        <div className={styles.container}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      )}
      <Outlet />
    </>
  );
}

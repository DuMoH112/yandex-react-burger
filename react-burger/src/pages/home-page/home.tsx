import styles from "./home.module.css";

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export const HomePage = () => {
  return (
    <>
      <div className={styles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </>
  );
};

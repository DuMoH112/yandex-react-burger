import { useDispatch } from "react-redux";
import { useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import stylesBurgerIngredients from "./burger-ingredients.module.css";
import { useSelector } from "react-redux";

import { SET_CURRENT_INGREDIENT } from "../../services/actions/ingredients";
import { openIngredientModal } from "../../services/actions/modal";

import { IBurgerIngredients, IIngredient } from "../../utils/interfaces";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    {
      name: "bun",
      title: "Булки",
    },
    {
      name: "sauce",
      title: "Соусы",
    },
    {
      name: "main",
      title: "Начинки",
    },
  ];

  const [current, setCurrent] = useState(tabs[0].name);
  const ingredients = useSelector(
    (store: { burgerIngredients: IBurgerIngredients }) =>
      store.burgerIngredients.ingredients
  );

  const openModal = useCallback(
    (item) => {
      dispatch(openIngredientModal());
      dispatch({ type: SET_CURRENT_INGREDIENT, currentIngredient: item });
      navigate(`/ingredients/${item._id}`, { state: { background: location } });
    },
    [dispatch, navigate, location]
  );

  const ingredientsList = useMemo(() => {
    return (ingredients as IIngredient[])
      .filter((el) => el.type === current)
      .map((item) => (
        <BurgerIngredientsItem
          key={item._id}
          item={item}
          openModal={openModal}
        />
      ));
  }, [ingredients, current, openModal]);

  return (
    <section>
      <h1 className={`text_type_main-large`}>Соберите бургер</h1>
      <div
        className={stylesBurgerIngredients.selection_header}
        style={{ display: "flex" }}
      >
        {tabs.map((tab) => (
          <Tab
            onClick={setCurrent}
            active={current === tab.name}
            value={tab.name}
            key={tab.name}
          >
            {tab.title}
          </Tab>
        ))}
      </div>
      <ul className={`${stylesBurgerIngredients.card_container}`}>
        {ingredientsList}
      </ul>
    </section>
  );
};

export default BurgerIngredients;

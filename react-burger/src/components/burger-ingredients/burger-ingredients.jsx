import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import stylesBurgerIngredients from "./burger-ingredients.module.css";
import { useSelector } from "react-redux";

import { SET_CURRENT_INGREDIENT } from "../../services/actions/ingredients";
import { openIngredientModal } from "../../services/actions/modal";

function BurgerIngredients() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const [current, setCurrent] = React.useState(tabs[0].name);
  const ingredients = useSelector(
    (store) => store.burgerIngredients.ingredients
  );

  const openModal = (item) => {
    dispatch(openIngredientModal());
    dispatch({ type: SET_CURRENT_INGREDIENT, currentIngredient: item });
    navigate(`/ingredients/${item._id}`);
  };

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
        {ingredients
          .filter((el) => el.type === current)
          .map((item) => (
            <BurgerIngredientsItem
              key={item._id}
              item={item}
              openModal={openModal}
            />
          ))}
      </ul>
    </section>
  );
}

export default BurgerIngredients;

import { FC, useMemo } from "react";
import { useParams } from "react-router";
import { useSelector } from "../../services/hooks";

import stylesDetails from "./ingredient-details.module.css";

import {
  IBurgerIngredients,
  IIngredient,
} from "../../utils/interfaces";

const IngredientDetails: FC = () => {
  const { currentIngredient, ingredients } = useSelector(
    (store: { burgerIngredients: IBurgerIngredients }) =>
      store.burgerIngredients
  );
  const { isOpenModalIngredient } = useSelector(
    (store) => store.modal
  );
  const { id } = useParams();

  const ingredient = useMemo(() => {
    return currentIngredient !== null
      ? currentIngredient
      : (ingredients as IIngredient[]).find(
        (item: IIngredient) => item._id === id
      );
  }, [currentIngredient, ingredients, id]);

  const className = isOpenModalIngredient
    ? stylesDetails.root_modal
    : stylesDetails.root_page;

  return ingredient ? (
    <div className={className}>
      <img src={ingredient.image_large} alt="" />
      <h4 className="text_type_main-medium mb-8 mt-4">{ingredient.name}</h4>
      <div className={`${stylesDetails.info}`}>
        <div className={`${stylesDetails.infoItem} mr-5`}>
          <span className="text_type_main-default mb-2">Калории,ккал</span>
          <span className="text_type_digits-default">
            {ingredient.calories}
          </span>
        </div>
        <div className={`${stylesDetails.infoItem} mr-5`}>
          <span className="text_type_main-default mb-2">Белки, г</span>
          <span className="text_type_digits-default">
            {ingredient.proteins}
          </span>
        </div>
        <div className={`${stylesDetails.infoItem} mr-5`}>
          <span className="text_type_main-default mb-2">Жиры, г</span>
          <span className="text_type_digits-default">{ingredient.fat}</span>
        </div>
        <div className={`${stylesDetails.infoItem}`}>
          <span className="text_type_main-default mb-2">Углеводы, г</span>
          <span className="text_type_digits-default">
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default IngredientDetails;

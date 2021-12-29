import { FC, useCallback } from "react";
import { useSelector } from "../../services/hooks";
import { useParams } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item-details.module.css";
import {
  IBurgerIngredients,
  IIngredient,
  IOrderItem,
} from "../../utils/interfaces";

import dateConverter from "../../utils/dateConverter";

interface IIngredientObj {
  count: number;
  name?: string;
  img?: string;
  price?: number;
}

const OrderItemDetails: FC = () => {
  const { currentOrder, orders } = useSelector(
    (store) => store.orders
  );
  const { isOpenModalOrderDetails } = useSelector(
    (store) => store.modal
  );
  const ingredients = useSelector(
    (store: { burgerIngredients: IBurgerIngredients }) =>
      store.burgerIngredients.ingredients
  );
  const { id } = useParams();
  const ingredientsObj: {
    [key: string]: IIngredientObj;
  } = {};

  const order = currentOrder
    ? currentOrder
    : orders.orders.find((item: IOrderItem) => item._id === id);
  let total = 0;

  order?.ingredients.forEach((el) => {
    let isIngredient = ingredients.find((el_i: IIngredient) => el_i._id === el);
    if (isIngredient && !ingredientsObj[isIngredient._id]) {
      ingredientsObj[isIngredient._id] = {
        name: isIngredient.name,
        price: isIngredient.price,
        img: isIngredient.image_mobile,
        count: 1,
      };
    } else if (isIngredient && ingredientsObj[isIngredient._id]) {
      ingredientsObj[isIngredient._id].count += 1;
    }
    total += isIngredient ? isIngredient.price : 0;
  });

  const statusValue = useCallback((status: "created" | "pending" | "done") => {
    const style: { color?: string } = {};
    let text = "";

    switch (status) {
      case "created":
        text = "Создан";
        break;
      case "pending":
        text = "Готовится";
        break;
      case "done":
        text = "Выполнен";
        style.color = "#00CCCC";
        break;
      default:
    }

    return (
      <p
        className={`${styles.status} text text_type_main-default mb-6`}
        style={style}
      >
        {text}
      </p>
    );
  }, []);

  const ingredientsObjLayout = useCallback(
    (ingredientsObj: { [key: string]: IIngredientObj }) => {
      const array = [];
      for (const ingredient in ingredientsObj) {
        array.push(
          <li key={ingredient} className={styles.ingredient_info}>
            <div className={styles.ingredient_icon_name}>
              <img
                className={`${styles.ingredient_icon} mr-4`}
                src={ingredientsObj[ingredient].img}
                alt=""
              />
              <span className={`text text_type_main-default`}>
                {ingredientsObj[ingredient].name}
              </span>
            </div>
            <div className={styles.ingredient_qty_price}>
              <span className={"text text_type_digits-default"}>
                {ingredientsObj[ingredient].count}
              </span>
              <span className={"text text_type_main-default mr-2 ml-2"}>x</span>
              <span className={"text text_type_digits-default mr-2"}>
                {ingredientsObj[ingredient].price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        );
      }
      return array;
    },
    []
  );

  return order ? (
    <div
      className={isOpenModalOrderDetails ? styles.root_modal : styles.root_page}
    >
      <div>
        {!isOpenModalOrderDetails && (
          <p
            className={`text text_type_digits-default mb-10 ${styles.page_number}`}
          >
            #{order.number}
          </p>
        )}
        <p
          className={`text text_type_main-medium ${isOpenModalOrderDetails ? "mt-3 mb-1" : "mb-3"
            }`}
        >
          {order.name}
        </p>
        {statusValue(order.status)}
        <p className={"text text_type_main-medium mb-6"}>Состав:</p>
        <ul className={`${styles.ingredients_obj} mb-10 pr-6`}>
          {ingredientsObjLayout(ingredientsObj)}
        </ul>
        <div className={styles.time_total}>
          <span className="text text_type_main-default text_color_inactive">
            {dateConverter(new Date(order.createdAt))}
          </span>
          <div className={styles.total}>
            <span className={"text text_type_digits-default mr-2"}>
              {total}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default OrderItemDetails;

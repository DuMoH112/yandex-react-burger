import { FC, useCallback } from "react";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-item.module.css";
import {
  IBurgerIngredients,
  IIngredient,
  IOrderItem,
} from "../../utils/interfaces";
import dateConverter from "../../utils/dateConverter";

interface IProps {
  orderItem: IOrderItem;
  showStatus: boolean;
  openModal: (item: IOrderItem) => void;
}

export const OrderItem: FC<IProps> = ({
  orderItem,
  openModal,
  showStatus = true,
}) => {
  const ingredients = useSelector(
    (store: { burgerIngredients: IBurgerIngredients }) =>
      store.burgerIngredients.ingredients
  );
  let icons: string[] = [];
  let totalValue: number = 0;

  const showMore = orderItem.ingredients.length > 6;
  const extraValue = orderItem.ingredients.length - 6;

  orderItem.ingredients.slice(0, 6).forEach((ingredientItem) => {
    let ingredient = ingredients.find(
      (component: IIngredient) => component._id === ingredientItem
    );

    if (!ingredient) {
      return;
    }

    totalValue += ingredient.price;
    icons.push(ingredient.image_mobile);
  });

  const statusValue = useCallback((status: "created" | "pending" | "done") => {
    const style: any = {};
    let text = "";

    switch (status) {
      case "created":
        text = "Создан";
        break;
      case "pending":
        text = "Готовится";
        break;
      case "done":
        text = "Заказ готов";
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

  return (
    <div
      className={`${styles.root} mb-4  p-6`}
      onClick={() => openModal(orderItem)}
    >
      <div className={`${styles.header} mb-6`}>
        <span className={`${styles.number} text text_type_main-default`}>
          #{orderItem.number}
        </span>
        <span className={"text text_type_main-default text_color_inactive"}>
          {dateConverter(new Date(orderItem.createdAt))}
        </span>
      </div>
      <p
        className={`${styles.name} text text_type_main-medium ${
          showStatus ? "mb-2" : "mb-6"
        }`}
      >
        {orderItem.name}
      </p>
      {showStatus && statusValue(orderItem.status)}
      <div className={styles.container}>
        <div className={styles.icons}>
          {icons.map((src, index) => (
            <img
              className={`${styles.icon} ${
                index === 5 && showMore && styles.iconMore
              }`}
              src={src}
              key={index}
              style={{ zIndex: 10 - index }}
              alt=""
            />
          ))}
          {showMore && (
            <div className={`text text_type_main-default ${styles.moreItems}`}>
              +{extraValue}
            </div>
          )}
        </div>
        <div className={styles.total}>
          <p className={`text text_type_digits-default mr-2`}>{totalValue}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

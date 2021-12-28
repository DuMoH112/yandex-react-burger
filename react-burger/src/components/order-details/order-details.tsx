import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import stylesDetails from "./order-details.module.css";
import { useSelector } from "../../services/hooks";

import { IBurgerIngredients } from "../../utils/interfaces";
import { Loader } from "../loader/loader";

const OrderDetails = () => {
  const orderNumber = useSelector(
    (store: { burgerIngredients: IBurgerIngredients }) =>
      store.burgerIngredients.order.orderNumber
  );
  return orderNumber ? (
    <div className={stylesDetails.root}>
      <h4 className="text_type_digits-large mt-1 mb-4">{orderNumber}</h4>
      <span className="text_type_main-default">идентификатор заказа</span>
      <div className="mb-8 mt-8">
        <CheckMarkIcon type="secondary" />
      </div>
      <span className="text_type_main-small mb-2">
        Ваш заказ начали готовить
      </span>
      <span className="text_type_main-small text_color_inactive mt-1 mb-8">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  ) : (
    <div className={`${stylesDetails.root} ${stylesDetails.loading} text_type_main-default`}>
        <Loader />
    </div>
  );
};

export default OrderDetails;

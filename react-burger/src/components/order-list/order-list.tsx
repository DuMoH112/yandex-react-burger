import { FC, useCallback } from "react";
import { useDispatch } from "../../services/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./order-list.module.css";
import { OrderItem } from "../order-item/order-item";
import { IOrderItem } from "../../utils/interfaces";
import { openOrderDetailsModal } from "../../services/actions/modal";
import { orderSetCurrentIngredient } from "../../services/actions/orders";

interface IProps {
  orderList: IOrderItem[];
  showStatus: boolean;
  componentMountedFrom: string;
}

export const OrderList: FC<IProps> = ({
  orderList,
  showStatus,
  componentMountedFrom,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const openModal = useCallback(
    (item) => {
      dispatch(openOrderDetailsModal());
      dispatch(orderSetCurrentIngredient(item));

      let url = "";
      switch (componentMountedFrom) {
        case "feed":
          url = `/feed/${item._id}`;
          break;
        case "orders":
          url = `/profile/orders/${item._id}`;
          break;

        default:
          break;
      }
      navigate(url, {
        state: {
          background: location,
          header: item.number,
        },
      });
    },
    [dispatch, navigate, location, componentMountedFrom]
  );

  const className =
    componentMountedFrom === "orders" ? styles.list_orders : styles.list_feed;

  return (
    <>
      {
        <ul className={`${styles.list} ${className}`}>
          {orderList &&
            orderList.map((item) => (
              <li key={item._id}>
                <OrderItem
                  orderItem={item}
                  key={item._id}
                  showStatus={showStatus}
                  openModal={openModal}
                />
              </li>
            ))}
        </ul>
      }
    </>
  );
};

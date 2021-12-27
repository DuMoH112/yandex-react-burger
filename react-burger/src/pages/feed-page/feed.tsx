import { useSelector } from "../../services/hooks";

import styles from "./feed.module.css";
import { OrderList } from "../../components/order-list/order-list";

import { IOrderItem, IOrderNumbers, IOrderState } from "../../utils/interfaces";

export const FeedPage = () => {
  const orders = useSelector((store: { orders: IOrderState }) => store.orders);
  const ordersResponse = orders.orders.orders || [];
  const orderList = ordersResponse || [];

  const ordersNumbers: IOrderNumbers = {
    done: [],
    pending: [],
  };

  orderList.forEach((item: IOrderItem) => {
    if (item.status === "done" || item.status === "pending") {
      ordersNumbers[item.status].push(item.number);
    }
  });

  return (
    <section className={styles.root}>
      <h1 className={`${styles.title} text_type_main-large`}>Лента заказов</h1>
      <div className={styles.orderList}>
        <OrderList orderList={orderList} showStatus={false} componentMountedFrom={"feed"}/>
      </div>
      <div className={`${styles.info}`}>
        <div className={`${styles.statusContainer}`}>
          <div className={`${styles.status}`}>
            <h2 className={`text text_type_main-medium mb-6`}>Готовы:</h2>
            <ul className={styles.list}>
              {ordersNumbers &&
                ordersNumbers.done.map((order) => (
                  <li
                    className={`text text_type_digits-default ${styles.done}`}
                    key={order}
                  >
                    {order}
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.status}>
            <h2 className={`text text_type_main-medium mb-6`}>В работе:</h2>
            <ul className={styles.list}>
              {ordersNumbers &&
                ordersNumbers.pending.map((order) => (
                  <li
                    className={`text text_type_digits-default ${styles.pending}`}
                    key={order}
                  >
                    {order}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <p className={`text text_type_main-medium ${styles.textShadow}`}>
          Выполнено за все время:
        </p>
        <p className={`text text_type_digits-large mb-15 ${styles.textShadow}`}>
          {orders.orders.total}
        </p>
        <p className={`text text_type_main-medium ${styles.textShadow}`}>
          Выполнено за сегодня:
        </p>
        <p className={`text text_type_digits-large ${styles.textShadow}`}>
          {orders.orders.totalToday}
        </p>
      </div>
    </section>
  );
};

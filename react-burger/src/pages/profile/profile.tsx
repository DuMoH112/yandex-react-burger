import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";

import styles from "./profile.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import EditedInput from "../../components/edited-input/edited-inpit";
import { OrderList } from "../../components/order-list/order-list";
import { Loader } from "../../components/loader/loader";
import {
  getUserData,
  loggingOut,
  patchUserData,
} from "../../services/actions/user";

import {
  wsUserOrderConnectionClosed,
  wsUserOrderConnectionStart,
} from "../../services/actions/orders";
import { IUser } from "../../utils/interfaces";

const validateEmail = function validateEmail(email: string) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");

  const classNames = useMemo(() => {
    return {
      profile: "/profile" === location.pathname ? styles.button_active : "",
      orders:
        "orders" === location.pathname.split("/")[2]
          ? styles.button_active
          : "",
    };
  }, [location.pathname]);

  // ----/profile----
  const { userData } = useSelector((store: { user: IUser }) => store.user);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isUpdateUserData, setIsUpdateUserData] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUpdateUserData(true);
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const onHandleCacelButton = useCallback(() => {
    setUpdateForm({
      name: "",
      email: "",
      password: "",
    });
    setIsUpdateUserData(false);
  }, []);

  const onHandleSaveButton = useCallback(() => {
    dispatch(patchUserData({ ...updateForm }));
    setIsUpdateUserData(false);
  }, [dispatch, updateForm]);
  // ----------------

  // ----/profile/orders----
  const { wsConnected, orders } = useSelector(
    (store) => store.orders
  );
  // -----------------------

  useEffect(() => {
    switch (location.pathname) {
      case "/profile":
        setDescription(
          "В этом разделе вы можете изменить свои персональные данные"
        );
        if (
          JSON.stringify(userData) === JSON.stringify({ email: "", name: "" })
        ) {
          dispatch(getUserData());
        } else {
          setForm({ name: userData.name, email: userData.email, password: "" });
        }
        break;
      case "/profile/orders":
        dispatch(wsUserOrderConnectionStart());

        setDescription(
          "В этом разделе вы можете просмотреть свою историю заказов"
        );
        break;
      default:
        break;
    }
    return () => {
      if (location.pathname === "/profile/orders")
        dispatch(wsUserOrderConnectionClosed());
    };
  }, [dispatch, userData, location.pathname]);

  // ----/logout----
  const onHandleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loggingOut());
    navigate("/login");
  };
  // ---------------

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_navigate}>
          <Link to="/profile" className={styles.button}>
            <span
              className={`${styles.button_text} ${classNames.profile} text text_type_main-medium`}
            >
              Профиль
            </span>
          </Link>
          <Link to="/profile/orders" className={styles.button}>
            <span
              className={`${styles.button_text} ${classNames.orders} text text_type_main-medium`}
            >
              История заказов
            </span>
          </Link>
          <Link to="/logout" className={styles.button} onClick={onHandleLogout}>
            <span
              className={`${styles.button_text} text text_type_main-medium`}
            >
              Выход
            </span>
          </Link>
          <span
            className={`${styles.description} text text_type_main-small text_color_inactive`}
          >
            {description}
          </span>
        </div>
        {location.pathname === "/profile" && (
          <form className={styles.form}>
            <EditedInput
              name={"name"}
              placeholder={"Имя"}
              value={updateForm.name === "" ? form.name : updateForm.name}
              onChange={onChange}
            />
            <EditedInput
              type="email"
              name="email"
              placeholder={"E-mail"}
              value={updateForm.email === "" ? form.email : updateForm.email}
              onChange={onChange}
              validateFunction={validateEmail}
            />
            <EditedInput
              type="password"
              name="password"
              placeholder={"Пароль"}
              value={
                updateForm.password === "" ? form.password : updateForm.password
              }
              onChange={onChange}
            />
            {isUpdateUserData && (
              <div className={styles.buttonsContainer}>
                <Button size="medium" onClick={onHandleCacelButton}>
                  Отмена
                </Button>
                <Button size="medium" onClick={onHandleSaveButton}>
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        )}
        {location.pathname.split("/")[2] === "orders" && (
          <div
            className={
              orders.orders.length !== 0
                ? styles.order_list
                : styles.empty_order_list
            }
          >
            {orders.orders.length !== 0 ? (
              <OrderList
                orderList={orders.orders || []}
                showStatus={true}
                componentMountedFrom={"orders"}
              />
            ) : orders.orders.length === 0 && wsConnected ? (
              <h3 className={`text text_type_main-medium`}>
                Вы ещё не совершили заказ. Для заказа перейдите на страницу{" "}
                <Link to="/">конструктура</Link>
              </h3>
            ) : (
              <Loader />
            )}
          </div>
        )}
      </div>
    </>
  );
};

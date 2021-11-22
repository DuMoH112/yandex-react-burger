import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";

import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

function AppHeader() {
  const location = useLocation();
  const classNames = useMemo(() => {
    return {
      home:
        "/" === location.pathname ||
        "ingredients" === location.pathname.split("/")[1]
          ? styles.button_active
          : "",
      orders:
        "orders" === location.pathname.split("/")[1]
          ? styles.button_active
          : "",
      profile:
        "profile" === location.pathname.split("/")[1]
          ? styles.button_active
          : "",
    };
  }, [location.pathname]);
  const classLink = "pt-4 pr-5 pb-4 pl-5 mr-2";
  return (
    <header className={`${styles.header}`}>
      <nav className={styles.nav}>
        <a href="/" className={`${styles.button} ${classLink}`}>
          <BurgerIcon type="primary" />
          <span
            className={`${styles.button_text} ${classNames.home} text_type_main-default`}
          >
            Конструктор
          </span>
        </a>
        <a href="/orders" className={`${styles.button} ${classLink}`}>
          <ListIcon type="secondary" />
          <span
            className={`${styles.button_text} ${classNames.orders} text_type_main-default`}
          >
            Лента заказов
          </span>
        </a>
        <a href="/" className={styles.logo}>
          <Logo />
        </a>
        <a href="/profile" className={`${styles.button} ${classLink}`}>
          <ProfileIcon type="secondary" />
          <span
            className={`${styles.button_text} ${classNames.profile} text_type_main-default`}
          >
            Личный кабинет
          </span>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;

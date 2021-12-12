import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  Logo,
  ListIcon,
  BurgerIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./app-header.module.css";

const AppHeader = () => {
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
        <Link to="/" className={`${styles.button} ${classLink}`}>
          <BurgerIcon type="primary" />
          <span
            className={`${styles.button_text} ${classNames.home} text_type_main-default`}
          >
            Конструктор
          </span>
        </Link>
        <Link to="/orders" className={`${styles.button} ${classLink}`}>
          <ListIcon type="secondary" />
          <span
            className={`${styles.button_text} ${classNames.orders} text_type_main-default`}
          >
            Лента заказов
          </span>
        </Link>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <Link to="/profile" className={`${styles.button} ${classLink}`}>
          <ProfileIcon type="secondary" />
          <span
            className={`${styles.button_text} ${classNames.profile} text_type_main-default`}
          >
            Личный кабинет
          </span>
        </Link>
      </nav>
    </header>
  );
}

export default AppHeader;

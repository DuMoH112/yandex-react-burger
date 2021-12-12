import React from "react";
import { Link } from "react-router-dom";

import styles from "./not-found.module.css";
import "@ya.praktikum/react-developer-burger-ui-components";

export const NotFound404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="text text_type_main-large">Oops! 404 Error</h1>
        <p className="text text_type_main-default mt-5">
          Запрашиваемая страница не найдена
        </p>
        <p className="text text_type_main-default mt-3">
          проверьте адрес или перейдите на{" "}
          <Link to="/" className={styles.link}>
            главную страницу
          </Link>
        </p>
      </div>
    </div>
  );
};

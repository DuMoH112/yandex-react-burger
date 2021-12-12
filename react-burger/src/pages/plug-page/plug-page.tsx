import React from "react";
import { Link } from "react-router-dom";

import styles from "./plug-page.module.css";
import "@ya.praktikum/react-developer-burger-ui-components";

export const PlugPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="text text_type_main-large">Oops! </h1>
        <p className="text text_type_main-default mt-5">
          Данная страница находится в разрабоке
        </p>
        <p className="text text_type_main-default mt-3">
          перейдите пожалуйста на{" "}
          <Link to="/" className={styles.link}>
            главную страницу
          </Link>
        </p>
      </div>
    </div>
  );
};

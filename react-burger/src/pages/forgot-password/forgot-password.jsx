import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./forgot-password.module.css";
import {
  Input,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";

export function FrogotPasswordPage() {
  const [form, setValue] = useState({ email: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <h1 className={`${styles.title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>
        <form className={styles.form}>
          <Input
            type="email"
            name="email"
            placeholder={"Укажите e-mail"}
            value={form.email}
            onChange={onChange}
          />
          <Button type="primary" size="large">
            Восстановить
          </Button>
        </form>
        <div className={styles.container_text}>
          <span className="text text_type_main-small text_color_inactive">
            Вспомнили пароль?{" "}
          </span>
          <Link
            to="/login"
            className={`${styles.link} text text_type_main-small`}
          >
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}

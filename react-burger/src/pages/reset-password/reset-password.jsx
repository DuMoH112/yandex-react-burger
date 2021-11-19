import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./reset-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";

export function ResetPasswordPage() {
  const [form, setValue] = useState({ password: "", code: "" });

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
            type={"password"}
            name={"password"}
            placeholder={"Введите новый пароль"}
            value={form.password}
            onChange={onChange}
          />
          <Input
            type="text"
            name="code"
            placeholder={"Введите код из письма"}
            value={form.code}
            onChange={onChange}
          />
          <Button type="primary" size="large">
            Сохранить
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

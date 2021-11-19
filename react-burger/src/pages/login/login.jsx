import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./login.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";

export function LoginPage() {
  const [form, setValue] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <h1 className={`${styles.title} text text_type_main-medium mb-6`}>
          Вход
        </h1>
        <form className={styles.form}>
          <Input
            type="email"
            name="email"
            placeholder={"E-mail"}
            value={form.email}
            onChange={onChange}
          />
          <PasswordInput
            name="password"
            value={form.password}
            onChange={onChange}
          />
          <Button type="primary" size="large">
            Войти
          </Button>
        </form>
        <div className={styles.container_text}>
          <div>
            <span className="text text_type_main-small text_color_inactive">
              Вы — новый пользователь?{" "}
            </span>
            <Link
              to="/register"
              className={`${styles.link} text text_type_main-small`}
            >
              Зарегистрироваться
            </Link>
          </div>
          <div>
            <span className="text text_type_main-small text_color_inactive">
              Забыли пароль?{" "}
            </span>
            <Link
              to="/forgot-password"
              className={`${styles.link} text text_type_main-small`}
            >
              Восстановить пароль
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

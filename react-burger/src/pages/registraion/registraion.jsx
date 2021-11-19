import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./registraion.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";

export function RegistrationPage() {
  const [form, setValue] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <form className={styles.form}>
          <Input
            name={"name"}
            placeholder={"Имя"}
            onChange={onChange}
            value={form.name}
          />
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
            Зарегистрироваться
          </Button>
        </form>
        <div className={styles.container_text}>
          <span className="text text_type_main-small text_color_inactive">
            Уже зарегистрированы?{" "}
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

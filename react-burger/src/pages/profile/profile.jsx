import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./profile.module.css";

import AppHeader from "../../components/app-header/app-header";
import EditedInput from "../../components/edited-input/edited-inpit";

const validateEmail = function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export function ProfilePage() {
  const [form, setValue] = useState({ name: "", email: "", password: "" });
  const [description, setDescription] = useState("В этом разделе вы можете изменить свои персональные данные")

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <div className={styles.container_navigate}>
          <Link
            to="/profile"
            className={styles.button}
          >
            <span className={`${styles.button_text} ${styles.button_active} text text_type_main-medium`}>
              Профиль
            </span>
          </Link>
          <Link
            to="/profile/orders"
            className={styles.button}
          >
            <span className={`${styles.button_text} text text_type_main-medium`}>
              История заказов
            </span>
          </Link>
          <Link
            to="/logout"
            className={styles.button}
          >
            <span className={`${styles.button_text} text text_type_main-medium`}>
              Выход
            </span>
          </Link>
          <span className={`${styles.description} text text_type_main-small text_color_inactive`}>{description}</span>
        </div>
        <form className={styles.form}>
          <EditedInput
            name={"name"}
            placeholder={"Имя"}
            value={form.name}
            onChange={onChange}
          />
          <EditedInput
            type="email"
            name="email"
            placeholder={"E-mail"}
            value={form.email}
            onChange={onChange}
            validateFunction={validateEmail}
          />
          <EditedInput
            type="password"
            name="password"
            placeholder={"Пароль"}
            value={form.password}
            onChange={onChange}
          />
        </form>
      </div>
    </>
  );
}

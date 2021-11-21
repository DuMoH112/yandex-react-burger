import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./forgot-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/app-header/app-header";
import { forgotPassword } from "../../services/actions/user";

export function FrogotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((store) => store.user);
  const [form, setForm] = useState({ email: "" });

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onHandleForm = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ ...form }));
    navigate("/reset-password");
  };

  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <h1 className={`${styles.title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>
        <form id="forgot-form" className={styles.form} onSubmit={onHandleForm}>
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

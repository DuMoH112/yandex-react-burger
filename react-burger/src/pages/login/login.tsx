import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";

import styles from "./login.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginning } from "../../services/actions/user";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((store) => store.user);
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onHandleForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginning({ ...form }));
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-medium mb-6`}>
        Вход
      </h1>
      <form id="login-form" className={styles.form} onSubmit={onHandleForm}>
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
            Вы — новый пользователь?{" "}
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
  );
};

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";

import styles from "./registraion.module.css";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { register } from "../../services/actions/user";

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((store) => store.user);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  if (isAuth) navigate("/");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onHandleForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({ ...form }));
  };

  return (
    <div className={styles.container}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form
        id="registration-form"
        className={styles.form}
        onSubmit={onHandleForm}
      >
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
  );
};

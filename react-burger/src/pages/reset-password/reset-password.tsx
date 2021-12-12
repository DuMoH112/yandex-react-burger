import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import styles from "./reset-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { resetPassword } from "../../services/actions/user";

import { IUser } from "../../utils/interfaces";

export const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth } = useSelector((store: {user: IUser}) => store.user);
  const [form, setValue] = useState({ password: "", token: "" });
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  useEffect(() => {
    if (isAuth) navigate("/");
    if (!location.state) navigate("/login");
  }, [isAuth, location.state, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onHandleForm = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ ...form }));
    navigate("/login");
  };

  const onHandleVisiblePassword = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={`${styles.title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>
        <form id="reset-form" className={styles.form} onSubmit={onHandleForm}>
          <Input
            type={isVisiblePassword ? "text" : "password"}
            name={"password"}
            placeholder={"Введите новый пароль"}
            value={form.password}
            onChange={onChange}
            icon="ShowIcon"
            onIconClick={onHandleVisiblePassword}
          />
          <Input
            type="text"
            name="token"
            placeholder={"Введите код из письма"}
            value={form.token}
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

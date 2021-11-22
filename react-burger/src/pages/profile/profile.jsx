import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./profile.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

import EditedInput from "../../components/edited-input/edited-inpit";
import { getUserData, loggingOut, patchUserData } from "../../services/actions/user";

const validateEmail = function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData } = useSelector((store) => store.user);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isUpdateUserData, setIsUpdateUserData] = useState(false);
  const [updateForm, setUpdateForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [description] = useState(
    "В этом разделе вы можете изменить свои персональные данные"
  );

  useEffect(() => {
    dispatch(getUserData());
    setForm({ name: userData.name, email: userData.email, password: "" });
  }, [dispatch, userData.name, userData.email]);

  const onChange = (e) => {
    setIsUpdateUserData(true);
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const onHandleLogout = (e) => {
    e.preventDefault();
    dispatch(loggingOut());
    navigate("/login");
  };

  const onHandleCacelButton = useCallback(() => {
    setUpdateForm({
      name: "",
      email: "",
      password: "",
    });
    setIsUpdateUserData(false);
  }, []);

  const onHandleSaveButton = useCallback(() => {
    dispatch(patchUserData({ ...updateForm }));
    setIsUpdateUserData(false);
  }, [dispatch, updateForm]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_navigate}>
          <Link to="/profile" className={styles.button}>
            <span
              className={`${styles.button_text} ${styles.button_active} text text_type_main-medium`}
            >
              Профиль
            </span>
          </Link>
          <Link to="/profile/orders" className={styles.button}>
            <span
              className={`${styles.button_text} text text_type_main-medium`}
            >
              История заказов
            </span>
          </Link>
          <Link to="/logout" className={styles.button} onClick={onHandleLogout}>
            <span
              className={`${styles.button_text} text text_type_main-medium`}
            >
              Выход
            </span>
          </Link>
          <span
            className={`${styles.description} text text_type_main-small text_color_inactive`}
          >
            {description}
          </span>
        </div>
        <form className={styles.form}>
          <EditedInput
            name={"name"}
            placeholder={"Имя"}
            value={updateForm.name === "" ? form.name : updateForm.name}
            onChange={onChange}
          />
          <EditedInput
            type="email"
            name="email"
            placeholder={"E-mail"}
            value={updateForm.email === "" ? form.email : updateForm.email}
            onChange={onChange}
            validateFunction={validateEmail}
          />
          <EditedInput
            type="password"
            name="password"
            placeholder={"Пароль"}
            value={
              updateForm.password === "" ? form.password : updateForm.password
            }
            onChange={onChange}
          />
          { isUpdateUserData && <div className={styles.buttonsContainer}>
            <Button size="medium" onClick={onHandleCacelButton}>Отмена</Button>
            <Button size="medium" onClick={onHandleSaveButton}>Сохранить</Button>
          </div>}
        </form>
      </div>
    </>
  );
}

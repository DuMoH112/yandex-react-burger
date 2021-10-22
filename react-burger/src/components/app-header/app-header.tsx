import React from 'react';

import { 
  Logo, 
  ListIcon,
  BurgerIcon,
  ProfileIcon 
} from '@ya.praktikum/react-developer-burger-ui-components'

import headerStyles from './app-header.module.css';


function AppHeader() {
  const classLink = "pt-4 pr-5 pb-4 pl-5 mr-2"
  return (
    <header className={`${headerStyles.header}`}>
      <nav className={headerStyles.nav}>
        <a href="/" className={`${headerStyles.button} ${classLink}`}>
          <BurgerIcon type="primary" />
          <span className={`${headerStyles.button_text} ${headerStyles.button_active} text_type_main-default`}>Конструктор</span>
        </a>
        <a href="/" className={`${headerStyles.button} ${classLink}`}>
          <ListIcon type="secondary" />
          <span className={`${headerStyles.button_text} text_type_main-default`}>Лента заказов</span>
        </a>
        <a href="/" className={headerStyles.logo}>
          <Logo />
        </a>
        <a href="/" className={`${headerStyles.button} ${classLink}`}>
          <ProfileIcon type="secondary" />
          <span className={`${headerStyles.button_text} text_type_main-default`}>Личный кабинет</span>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage, NotFound404, LoginPage, RegistrationPage } from '../../pages';

import styles from './app.module.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/login" exact={true} element={<LoginPage />} />
        <Route path="/register" exact={true} element={<RegistrationPage />} />
        <Route path='*' exact={true} element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
};

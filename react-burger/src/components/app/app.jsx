import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  HomePage,
  NotFound404,
  LoginPage,
  RegistrationPage,
  FrogotPasswordPage,
  ResetPasswordPage,
  ProfilePage
} from "../../pages";
import RequireAuth from "../require-auth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<HomePage />} />
        <Route path="/login" exact={true} element={<LoginPage />} />
        <Route path="/register" exact={true} element={<RegistrationPage />} />
        <Route path="/forgot-password" exact={true} element={<FrogotPasswordPage />} />
        <Route path="/reset-password" exact={true} element={<ResetPasswordPage />} />
        <Route element={<RequireAuth />}> 
          <Route path="/profile" exact={true} element={<ProfilePage />} />
        </Route>
        <Route path="*" exact={true} element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
}

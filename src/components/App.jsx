import '../shared/styles/styles.scss';
import HomePage from "pages/Home/HomePage";
import LoginPage from "pages/Login/LoginPage";
import RegisterPage from "pages/Register/RegisterPage";
import { Routes, Route } from "react-router-dom";
import {RestrictedRoute} from "./RestrictedRoute"

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<RestrictedRoute
        component={LoginPage}
        redirectTo="/"
      />} />
      <Route path="/register" element={<RestrictedRoute
        component={RegisterPage}
        redirectTo="/"
      />} />
      <Route path="*" element={<h1>404 page not found</h1>} />
    </Routes>
  );
};

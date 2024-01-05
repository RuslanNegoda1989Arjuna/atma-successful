import HomePage from "pages/Home/HomePage";
import LoginPage from "pages/Login/LoginPage";
import RegisterPage from "pages/Register/RegisterPage";
import {Routes, Route} from "react-router-dom"

export const App = () => {
  return (
    <Routes>
      <Route  path="/" element={<HomePage />} />
      <Route  path="/login" element={<LoginPage/>} />
      <Route  path="/register" element={<RegisterPage/>} />
      <Route path="*" element={<h1>404 page not found</h1>} />
    </Routes>
  );
};

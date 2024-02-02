// rafce
import HomePage from "pages/Home/HomePage";
import LoginPage from "pages/Login/LoginPage";
import { Routes, Route } from "react-router-dom";
import {RestrictedRoute} from "./RestrictedRoute"
import Success from "./Success/Success";
import { PrivateRoute } from "./PrivateRoute";
import NavBar from "./NavBar/NavBar";

export const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<NavBar/>}>
          <Route index element={<Success />} />
          <Route
            path="/home"
            element={<PrivateRoute component={HomePage} redirectTo="/login" />}
          />
          <Route path="/login" element={<RestrictedRoute
                component={LoginPage}
                redirectTo="/home"
          />} />
      </Route>

      
      <Route path="*" element={<LoginPage/>} />
    </Routes>
  );
};

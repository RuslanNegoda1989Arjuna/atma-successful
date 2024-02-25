// rafce
import LoginPage from "pages/Login/LoginPage";
import { Routes, Route } from "react-router-dom";
import {RestrictedRoute} from "./RestrictedRoute"
import Success from "./Success/Success";
import { PrivateRoute } from "./PrivateRoute";
import NavBar from "./NavBar/NavBar";
import { ToastContainer } from 'react-toastify';
import HabitTrackerPage from "pages/Home/HabitTrackerPage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'
import CircularIndeterminate from 'components/CircularIndeterminate';

export const App = () => {

  const [, loading] = useAuthState(auth);

    if (loading) {
    return <CircularIndeterminate/>;
  }

  return (
    <>
    <Routes>
      <Route path="/" element={<NavBar/>}>
          <Route index element={<Success />} />
          <Route
            path="/habittracker"
            element={<PrivateRoute component={HabitTrackerPage} redirectTo="/login" />}
          />
          <Route path="/login" element={<RestrictedRoute
                component={LoginPage}
                redirectTo="/habittracker"
          />} />
      </Route>

      
      <Route path="*" element={<NavBar/>} />
      </Routes>
      <ToastContainer />
    </>
    
    
  );
};

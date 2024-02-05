import { useAuth } from '../../../hooks/use-auth';
import { HomeNavLink } from './Navigation.styled';

export const Navigation = () => {
   const { isAuth } = useAuth();
  // const isLoggedInT = true;

  return (
    <nav>
      <HomeNavLink to="/">Home</HomeNavLink>
      {isAuth && <HomeNavLink to="/phonebook">Phone Book</HomeNavLink>}
    </nav>
  );
};
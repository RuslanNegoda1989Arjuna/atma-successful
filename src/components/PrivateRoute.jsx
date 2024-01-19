import { useAuth } from '../hooks/use-auth';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const { isAuth } = useAuth();
  const shouldRedirect = !isAuth;
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};
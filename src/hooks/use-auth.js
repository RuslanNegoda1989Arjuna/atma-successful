import { useSelector } from 'react-redux';

export const useAuth = () => {
    const { email, token, id } = useSelector(state => state.user);
    const displayName = useSelector(state => state.user.displayName);

    return {
        isAuth: !!token,
        displayName,
        email,
        token,
        id,
    }
}

import { useSelector } from 'react-redux';

export const useAuth = () => {
    const { email, token, uid, photoURL,displayName } = useSelector(state => state.user);

    return {
        isAuth: !!token,
        displayName,
        email,
        token,
        uid,
        photoURL,
    }
}

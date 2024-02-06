import React, { useState, useEffect } from 'react';
import { ModalGrid, StyledGrid } from './LoginGoogle.styled';
import { Box, Button } from '@mui/material'
import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from '@mui/material/styles';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { app } from '../../firebase'
import { setUser } from '../../redux/slice/userSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularIndeterminate from 'components/CircularIndeterminate';
 // Імпортуємо компонент Loader

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetBase,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

const LoginGoogle = () => {
  const [isLoading, setIsLoading] = useState(false); // Додаємо стан isLoading

  const auth = getAuth(app);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleRedirect = async () => {
      setIsLoading(true); // Встановлюємо isLoading на true перед початком аутентифікації
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          const { uid, displayName, email, photoURL, refreshToken } = result.user;
          dispatch(setUser({ uid, displayName, email, token: refreshToken, photoURL }));
          toast.success(`Ви увійшли як ${displayName || email}`);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Позначаємо завершення аутентифікації, незалежно від результату
      }
    };

    handleRedirect();
  }, [auth, dispatch]);

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div>
      {isLoading && <CircularIndeterminate />} {/* Показуємо Loader, якщо isLoading === true */}
      <ThemeProvider theme={theme}>
        <StyledGrid container>
          <ModalGrid container>
            <Box p={5}>
              <Button onClick={login} variant="contained" color="violet">Увійти за допомогою Google</Button>
            </Box>
          </ModalGrid>
        </StyledGrid>
      </ThemeProvider>
    </div>
  );
}

export default LoginGoogle;

import React, { useEffect } from 'react';
import { ModalGrid, StyledGrid } from './LoginGoogle.styled';
import { Box, Button } from '@mui/material'
import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from '@mui/material/styles';
import {  firestore } from '../../firebase'
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";


// rafce

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
    const auth = getAuth();

     useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result.user) {
          console.log(result.user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleRedirect();
  }, [auth]);

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

//  const login = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       console.log(user);
//     } catch (error) {
//       console.error(error);
//     }
//     };
    
  return (
      <div>
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
  )
}

export default LoginGoogle

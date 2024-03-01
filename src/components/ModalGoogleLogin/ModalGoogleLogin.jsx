import Modal from '@mui/material/Modal';
import React, { useEffect } from 'react';
import { ModalGrid, StyledGrid } from './ModalGoogleLogin.styled';
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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
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

const ModalGoogleLogin = ({ open, onClose }) => {



  const auth = getAuth(app);
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
    };

  useEffect(() => {
    const handleRedirect = async () => {

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
      }
    };

    handleRedirect();
  }, [auth, dispatch]);

  const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    };
    
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ThemeProvider theme={theme}>
        <StyledGrid container>
          <ModalGrid container>
            <Box p={5}>
              <Button onClick={login} variant="contained" color="violet">Увійти за допомогою Google</Button>
            </Box>
          </ModalGrid>
        </StyledGrid>
      </ThemeProvider>
        <Button onClick={handleClose}>Закрити</Button>
      </Box>
    </Modal>
  );
};

export default ModalGoogleLogin;

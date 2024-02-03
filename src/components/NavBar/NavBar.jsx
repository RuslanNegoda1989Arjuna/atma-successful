import React, { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAuth } from '../../hooks/use-auth';
import Avatar from '@mui/material/Avatar';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/slice/userSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavBar = () => {
  const { isAuth, displayName, photoURL } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };
  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    const auth = getAuth();  
    signOut(auth).then(() => {

    dispatch(removeUser());
      
    toast.success('Ви вийшли з облікового запису');
  }).catch((error) => {
    console.error('Sign out error:', error);
  }).finally(() => {
    handleClose();
  });
};

  return (
    <div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleHomeClick}
              >
                <HouseRoundedIcon fontSize="large" />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Успішник
              </Typography>
              {isAuth ? (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {photoURL ? (
                      <Avatar alt={displayName} src={photoURL} />
                    ) : (
                      <AccountCircle />
                    )}
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Вийти</MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button color="inherit" onClick={handleLogin}>
                  Увійти
                </Button>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <Suspense fallback={<div>Loading page...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default NavBar;

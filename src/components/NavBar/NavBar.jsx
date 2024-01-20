import React, { Suspense } from 'react'
import { Outlet, useNavigate  } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';


const NavBar = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/')
  }
  const handleLogin = () => {
    navigate('/login')
  }
  return (
    <diм>
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
            <HouseRoundedIcon fontSize='large'/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Успішник
          </Typography>
          <Button color="inherit" onClick={handleLogin}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
      </div>
       <Suspense fallback={<div>Loading page...</div>}>
        <Outlet />
      </Suspense>
    </diм>
  
  )
}

export default NavBar



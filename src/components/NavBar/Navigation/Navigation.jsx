import { useAuth } from '../../../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import 'react-toastify/dist/ReactToastify.css';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';

export const Navigation = () => {
   const { isAuth } = useAuth();
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };
  const handleMySuccessClick = () => {
    navigate('/habittracker');
  };

  return (
    <>
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
      {isAuth && 
      <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleMySuccessClick}
              >
                <StarPurple500Icon fontSize="large" />
      </IconButton>}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Успішник
              </Typography>
      
    </>
  );
};
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomizedRating from './CustomizedRating';

const DayRatingButton = ({ button, index, handleDayClick, handleRatingChange }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Button
        variant={button.active ? 'outlined' : 'contained'}
        sx={{ width: '150px' }}
        onClick={() => handleDayClick(button.id)}
        disabled={!button.active}
      >
        {`День ${index + 1}`}
      </Button>
      <Typography sx={{ ml: 1 }}>
        <CustomizedRating
          value={button.rating}
          onChangeRating={(value) => handleRatingChange(value, button.id)}
        />
      </Typography>
    </Box>
  );
};

export default DayRatingButton;

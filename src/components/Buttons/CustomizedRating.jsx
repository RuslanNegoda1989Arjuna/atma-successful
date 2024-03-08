import React from 'react';
import { StyledRating } from '../HabitTracker/HabitTracker.styled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CustomizedRating = ({ value, onChangeRating }) => {
  const handleChange = (event, newValue) => {
    onChangeRating(newValue);
  };

  return (
    <StyledRating
      name="customized-color"
      value={value}
      onChange={handleChange}
      getLabelText={(value) => `${value} бали`}
      precision={1}
      max={3}
      icon={<FavoriteIcon fontSize="inherit" />}
      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
    />
  );
};

export default CustomizedRating;

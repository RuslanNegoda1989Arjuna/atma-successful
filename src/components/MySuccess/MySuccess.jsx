import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CustomizedRating = ({ value, onChangeRating }) => {
  const handleChange = (event, newValue) => {
    onChangeRating(newValue);
  };

  return (
    <Rating
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

const HabitTracker = () => {
  const [progress, setProgress] = useState(0);
  const [buttonActivity, setButtonActivity] = useState(Array(7).fill(false));
  const [ratings, setRatings] = useState(Array(7).fill(0));

  const handleDayClick = (day) => {
    if (buttonActivity[day - 1]) return;

    setProgress((prevProgress) => prevProgress + (1 / 21) * 100);
    setButtonActivity((prev) => {
      const newButtonActivity = [...prev];
      newButtonActivity[day - 1] = true;

      if (newButtonActivity.every((button) => button)) {
        setProgress(0);
        setButtonActivity(Array(7).fill(false));
        alert('Вітаю, ти сформував нову корисну звичку!');
      }

      return newButtonActivity;
    });
  };

  const handleRatingChange = (value, index) => {
    setRatings((prev) => {
      const newRatings = [...prev];
      newRatings[index] = value;
      return newRatings;
    });
  };

  const totalRating = ratings.reduce((total, rating) => total + rating, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Дні активованих кнопок: {buttonActivity.filter(Boolean).length}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Бали: {totalRating}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: '80%', height: '20px', mb: 2 }}
      />
      {[1, 2, 3, 4, 5, 6, 7].map((day, index) => (
        <Box key={day} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Button
            variant={buttonActivity[index] ? 'outlined' : 'contained'}
            onClick={() => handleDayClick(day)}
            disabled={buttonActivity[index]}
          >
            {`Day ${day}`}
          </Button>
          <Typography sx={{ ml: 1 }}>
            <CustomizedRating
              value={ratings[index]}
              onChangeRating={(value) => handleRatingChange(value, index)}
            />
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default HabitTracker;

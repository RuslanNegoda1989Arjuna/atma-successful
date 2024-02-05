import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CustomizedRating = ({ onChangeRating }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChangeRating(newValue);
  };

  return (
    <Rating
      name="customized-color"
      value={value}
      onChange={handleChange}
      getLabelText={(value) => `${value * 2} бали`}
      precision={0.5}
      max={3}
      icon={<FavoriteIcon fontSize="inherit" />}
      emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
    />
  );
};

const HabitTracker = () => {
  const [progress, setProgress] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const [buttonActivity, setButtonActivity] = useState(Array(7).fill(false));
  const [totalRating, setTotalRating] = useState(0);

  const handleDayClick = (day) => {
    if (day === activeDay || buttonActivity[day - 1]) return;

    setProgress((prevProgress) => prevProgress + (1 / 21) * 100);
    setActiveDay(day);
    setButtonActivity((prev) => {
      const newButtonActivity = [...prev];
      newButtonActivity[day - 1] = true;

      if (newButtonActivity.every((button) => button)) {
        setProgress(0);
        setActiveDay(0);
      }

      return newButtonActivity;
    });
  };

  const handleRatingChange = (value) => {
    // Додаємо 2 бали за кожне заповнене сердечко
    setTotalRating((prev) => prev + value * 2);
  };

  const activeButtonCount = buttonActivity.filter(Boolean).length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Дні активованих кнопок: {activeButtonCount}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Бали: {totalRating}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: '100%', height: '20px', mb: 2 }}
      />
      {[1, 2, 3, 4, 5, 6, 7].map((day, index) => (
        <Box key={day} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Button
            variant={activeDay === day ? 'outlined' : 'contained'}
            onClick={() => handleDayClick(day)}
            disabled={buttonActivity[index]}
          >
            {`Day ${day}`}
          </Button>
          <Typography sx={{ ml: 1 }}>
            <CustomizedRating onChangeRating={handleRatingChange} />
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default HabitTracker;

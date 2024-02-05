import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  const [buttonActivity, setButtonActivity] = useState(Array(21).fill(false));
  const [ratings, setRatings] = useState(Array(21).fill(0));
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    if (buttonActivity.every((activity) => activity)) {
      alert('Вітаю, ти сформував нову корисну звичку!');
      setProgress(0);
      setButtonActivity(Array(21).fill(false));
      setRatings(Array(21).fill(0));
      setPage(1);
    }
  }, [buttonActivity]);

  const handleDayClick = (day) => {
    if (buttonActivity[day - 1]) return;

    setProgress((prevProgress) => prevProgress + (1 / 21) * 100);
    setButtonActivity((prev) => {
      const newButtonActivity = [...prev];
      newButtonActivity[day - 1] = true;
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

  const renderButtons = () => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return [...Array(21)].map((_, index) => (
      (index >= start && index < end) && (
        <Box key={index + 1} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Button
            variant={buttonActivity[index] ? 'outlined' : 'contained'}
            onClick={() => handleDayClick(index + 1)}
            disabled={buttonActivity[index]}
          >
            {`Day ${index + 1}`}
          </Button>
          <Typography sx={{ ml: 1 }}>
            <CustomizedRating
              value={ratings[index]}
              onChangeRating={(value) => handleRatingChange(value, index)}
            />
          </Typography>
        </Box>
      )
    ));
  };

  const totalPages = Math.ceil(21 / itemsPerPage);

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
      {renderButtons()}
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
        <Button
          onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
          disabled={page === 1}
        >
          <ArrowBackIcon />
          Back
        </Button>
        <Button onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}>
          Show More
        </Button>
      </Box>
    </Box>
  );
};

export default HabitTracker;

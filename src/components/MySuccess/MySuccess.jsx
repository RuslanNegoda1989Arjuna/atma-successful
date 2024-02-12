import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StyledRating } from './MySuccess.styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";


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

const HabitTracker = () => {
  const [progress, setProgress] = useState(0);
  const [buttonActivity, setButtonActivity] = useState(Array(21).fill(false));
  const [ratings, setRatings] = useState(Array(21).fill(0));
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    if (buttonActivity.every((activity) => activity)) {
      toast.success('Вітаю, ти сформував нову корисну звичку!');
      setProgress(0);
      setButtonActivity(Array(21).fill(false));
      setRatings(Array(21).fill(0));
      setPage(1);
    }
  }, [buttonActivity]);

const handleDayClick = async (day) => {
  if (buttonActivity[day - 1]) return;

  setProgress((prevProgress) => prevProgress + (1 / 21) * 100);
  setButtonActivity((prev) => {
    const newButtonActivity = [...prev];
    newButtonActivity[day - 1] = true;
    return newButtonActivity;
  });

  try {
    // Отримання посилання на колекцію "days"
    const daysCollectionRef = collection(db, 'days');

    // Отримання посилання на документ у колекції "days" за допомогою ID дня
    const dayDocRef = doc(daysCollectionRef, "new");

    // Оновлення існуючого документу
    await setDoc(dayDocRef, {
      dayNumber: day,
      rating: ratings[day - 1],
      // Додайте інші дані, які вам потрібно зберегти
    });
  } catch (error) {
    console.error("Помилка при оновленні документу: ", error);
  }
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
            sx={{ width: '150px' }}
            onClick={() => handleDayClick(index + 1)}
            disabled={buttonActivity[index]}
          >
            {`День ${index + 1}`}
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
        Днів виконую звичку: {buttonActivity.filter(Boolean).length}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Всього балів: {totalRating}
      </Typography>
      {renderButtons()}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: '80%', height: '20px', mb: 2, borderRadius: '10px',marginTop: '20px' }}
      />
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

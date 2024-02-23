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
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
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

const buttonsObj = [
  { id: 1, active: true, rating: 0 },
  { id: 2, active: true, rating: 0 },
  { id: 3, active: true, rating: 0 },
  { id: 4, active: true, rating: 0 },
  { id: 5, active: true, rating: 0 },
  { id: 6, active: true, rating: 0 },
  { id: 7, active: true, rating: 0 },
  { id: 8, active: true, rating: 0 },
  { id: 9, active: true, rating: 0 },
  { id: 10, active: true, rating: 0 },
  { id: 11, active: true, rating: 0 },
  { id: 12, active: true, rating: 0 },
  { id: 13, active: true, rating: 0 },
  { id: 14, active: true, rating: 0 },
  { id: 15, active: true, rating: 0 },
  { id: 16, active: true, rating: 0 },
  { id: 17, active: true, rating: 0 },
  { id: 18, active: true, rating: 0 },
  { id: 19, active: true, rating: 0 },
  { id: 20, active: true, rating: 0 },
  { id: 21, active: true, rating: 0 }
];

const HabitTracker = () => {
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;
  const [buttonsData, setButtonsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dayDocRef = doc(db, 'days', 'new');
        const daySnap = await getDoc(dayDocRef);
        if (daySnap.exists()) {
          setButtonsData(daySnap.data().buttonsData);
        } else {
          setButtonsData(buttonsObj);
        }
      } catch (error) {
        console.error("Помилка при отриманні документу:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {

    if (buttonsData.length === 0) return;
    const totalActiveButtons = buttonsData.filter(button => !button.active).length;
    const totalButtons = buttonsData.length;
    const progressPercentage = (totalButtons > 0 && !isNaN(totalActiveButtons / totalButtons)) ? (totalActiveButtons / totalButtons) * 100 : 0;
    setProgress(progressPercentage);

    const isAllButtonsInactive = buttonsData.every(button => !button.active);

    if (buttonsData.length > 0 && isAllButtonsInactive) {
      toast.success('Вітаю, ти сформував нову корисну звичку!');
      setButtonsData(buttonsObj);
      setPage(1);
    }
  }, [buttonsData]);

  const handleDayClick = async (id) => {
    const updatedButtonsData = buttonsData.map(button =>
      button.id === id ? { ...button, active: !button.active } : button
    );
    setButtonsData(updatedButtonsData);

    try {
      const daysCollectionRef = collection(db, 'days');
      const dayDocRef = doc(daysCollectionRef, "new");
      await setDoc(dayDocRef, { buttonsData: updatedButtonsData });
    } catch (error) {
      console.error("Помилка при оновленні документу: ", error);
    }
  };

  const handleRatingChange = async (value, id) => {
    const updatedButtonsData = buttonsData.map(button =>
      button.id === id ? { ...button, rating: value } : button
    );
    setButtonsData(updatedButtonsData);

    try {
      const daysCollectionRef = collection(db, 'days');
      const dayDocRef = doc(daysCollectionRef, "new");
      const daySnap = await getDoc(dayDocRef);
      const currentData = daySnap.data() || {};
      await setDoc(dayDocRef, { ...currentData, buttonsData: updatedButtonsData });
    } catch (error) {
      console.error("Помилка при оновленні документу: ", error);
    }
  };

  const totalRating = buttonsData.reduce((acc, obj) => acc + obj.rating, 0);

  const renderButtons = () => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return buttonsData.slice(start, end).map((button, index) => (
      <Box key={button.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Button
          variant={button.active ? 'outlined' : 'contained'}
          sx={{ width: '150px' }}
          onClick={() => handleDayClick(button.id)}
          disabled={!button.active}
        >
          {`День ${index + start + 1}`}
        </Button>
        <Typography sx={{ ml: 1 }}>
          <CustomizedRating
            value={button.rating}
            onChangeRating={(value) => handleRatingChange(value, button.id)}
          />
        </Typography>
      </Box>
    ));
  };

  const totalPages = Math.ceil(21 / itemsPerPage);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Днів виконую звичку: {buttonsData.filter(obj => !obj.active).length}
      </Typography>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Всього балів: {totalRating}
      </Typography>
      {renderButtons()}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ width: '80%', height: '20px', mb: 2, borderRadius: '10px', marginTop: '20px' }}
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

import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import DayRatingButton from '../Buttons/DayRatingButton';
import PaginationButtons from '../Buttons/PaginationButtons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, setDoc} from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataFromDatabase, setButtonsData } from '../../redux/slice/habitTrackerSlice';
import { buttonsObj } from '../../constants';

const HabitTracker = () => {
  const dispatch = useDispatch();
  const buttonsData = useSelector(state => state.habitTracker.buttonsData);
  const [progress, setProgress] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 7;
  const user = auth.currentUser;
  const userId = user.uid; // Отримати ідентифікатор поточного користувача

  useEffect(() => {
    dispatch(fetchDataFromDatabase(userId)); // Передати userId для завантаження даних конкретного користувача
  }, [dispatch, userId]);

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

  dispatch(setButtonsData(updatedButtonsData));

  try {
    const userDocRef = doc(db, 'users', userId); // Звернутися до документу користувача
    await setDoc(userDocRef, { buttonsData: updatedButtonsData }, { merge: true }); // Оновити дані користувача
  } catch (error) {
    console.error("Помилка при оновленні документу: ", error);
  }
};

const handleRatingChange = async (value, id) => {
  const updatedButtonsData = buttonsData.map(button =>
    button.id === id ? { ...button, rating: value } : button
  );

  dispatch(setButtonsData(updatedButtonsData));

  try {
    const userDocRef = doc(db, 'users', userId); // Звернутися до документу користувача
    await setDoc(userDocRef, { buttonsData: updatedButtonsData }, { merge: true }); // Оновити дані користувача
  } catch (error) {
    console.error("Помилка при оновленні документу: ", error);
  }
};


  const totalRating = buttonsData.reduce((acc, obj) => acc + obj.rating, 0);

  const renderButtons = () => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return buttonsData.slice(start, end).map((button, index) => (
      <DayRatingButton
        key={button.id}
        button={button}
        index={index + start}
        handleDayClick={handleDayClick}
        handleRatingChange={handleRatingChange}
      />
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
        <PaginationButtons setPage={setPage} page={page} totalPages={totalPages} />
      </Box>
    </Box>
  );
};

export default HabitTracker;

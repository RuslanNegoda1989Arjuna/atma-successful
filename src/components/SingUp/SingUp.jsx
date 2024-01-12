import React from 'react';
// import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slice/userSlice';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import RegisterForm from 'components/RegisterForm/RegisterForm';

const SignUp = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  const handleRegister = async (email, password, displayName) => {
    console.log(password);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Оновити профіль користувача з ім'ям
      await updateProfile(user, {
        displayName: displayName,
      });

      dispatch(setUser({
        email: user.email,
        id: user.uid,
        token: user.accessToken,
        displayName: user.displayName,
      }));
    } catch (error) {
      console.error("Registration failed:", error);

      // Визначити тип помилки
      if (error.code === "auth/weak-password") {
        alert('Password should be at least 6 characters.');
      } else if (error.code === "auth/email-already-in-use") {
        alert('This email is already registered.');
      } else {
        alert('Oops! Something went wrong.');
      }
    }
  };

  return (
    <div>
      <RegisterForm
  title="Register"
  handleSubmit={(values) => handleRegister(values.email, values.password, values.name)}
/>
    </div>
  );
};

export default SignUp;

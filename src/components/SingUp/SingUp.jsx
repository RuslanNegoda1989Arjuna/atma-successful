import React from 'react';
// import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slice/userSlice';
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import RegisterForm from 'components/RegisterForm/RegisterForm';
import auth from '../../firebase';

const SignUp = () => {
  const dispatch = useDispatch();
  // const auth = getAuth();

  const handleRegister = async (email, password, displayName) => {
    // console.log(displayName);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      // console.log(user)

      // Оновити профіль користувача з ім'ям
      await updateProfile(user, {
        displayName: displayName,
      });

      console.log("Ім'я користувача після реєстрації:", user.displayName);


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

  const user = auth.currentUser;
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
  console.log(email)
  console.log(photoURL)
  console.log(displayName)
  console.log(emailVerified)
  console.log(uid)

  }


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

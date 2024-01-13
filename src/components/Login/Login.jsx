import React from 'react';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slice/userSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  

  const handleLogin = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser({
        email: user.email,
        id: user.uid,
        token: user.accessToken,
      }));
    } catch (error) {
      console.error("Login failed:", error);
      alert('Invalid user!');
    }
  };

  return (
    <div>
      <Form
        title="Sign In"
        handleClick={handleLogin}
      />
    </div>
  );
};

export default Login;

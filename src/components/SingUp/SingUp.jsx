import  Form  from '../Form/Form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slice/userSlice'; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const SingUp = () => {
    const dispatch = useDispatch();

    
    
    const handlRegister = (email, password) => {
const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }))

            })
            .catch(console.error)
    };
  return (
    <div>
          <Form
              title="Register"
              handleClick = { handlRegister } />
    </div>
  )
}

export default SingUp

// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {

//     const user = userCredential.user;

//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;

//   });